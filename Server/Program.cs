using System;
using Stytch;
using Stytch.net.Clients;
using Stytch.net.Models.Consumer;
using Stytch.net.Exceptions;



var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder =>
        {
            builder.AllowAnyOrigin()
                   .AllowAnyMethod()
                   .AllowAnyHeader();
        });
});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAll");

app.UseHttpsRedirection();

var client = new ConsumerClient(new ClientConfig
{
    ProjectId = "project-test-61b0afb4-da8f-42c7-8bf9-43d3d00593a9",
    ProjectSecret = "secret-test-SJHdw2EDqbClgrWcXb9BQkINpNSWhVDnqUQ=",
    Environment = "https://test.stytch.com/"
});

app.MapGet("/send_otp", () =>
{
     var request = new OTPsEmailLoginOrCreateRequest() {
        Email = "ollie@stytch.com",
     };

     var response = client.OTPs.Email.LoginOrCreate(request);
     return response;

})
.WithName("SendOtp")
.WithOpenApi();

app.MapGet("/authenticate_otp", async (string otp, string methodId) =>
    {
        if (string.IsNullOrEmpty(otp))
        {
            return Results.BadRequest("OTP code is required.");
        }
        if (string.IsNullOrEmpty(methodId))
        {
            return Results.BadRequest("methodId code is required.");
        }

        var request = new OTPsAuthenticateRequest
        {
            MethodId = methodId,
            Code = otp,
            // Attributes = null,
            // Options = null,
            // SessionToken = null,
            // SessionDurationMinutes = null,
            // SessionJwt = null,
            // SessionCustomClaims = null
        };

         try
            {
                var response = await client.OTPs.Authenticate(request);

                if (response.StatusCode == 200)
                {
                    Console.WriteLine(response.User);
                    return Results.Ok(response);
                }
                else
                {
                    // Handle different status codes if necessary
                    return Results.BadRequest("Failed to authenticate OTP.");
                }
            }
            catch (StytchApiException ex)
            {
                // Log the exception details
                Console.WriteLine($"Error Type: {ex.ErrorType}");
                Console.WriteLine($"Error Message: {ex.ErrorMessage}");
                Console.WriteLine($"Error URL: {ex.ErrorUrl}");

                // Handle the exception based on the error type
                if (ex.StatusCode == 401)
                {
                    // Specific handling for unauthorized errors
                    return Results.BadRequest("Authentication failed. The OTP may be expired or invalid.");
                }
                else
                {
                    // General error handling
                    return Results.BadRequest("Error known occurred");
                }
            }
            catch (Exception ex)
            {
                // Handle unexpected exceptions
                Console.WriteLine($"Unexpected error: {ex.Message}");
                return Results.BadRequest("Error random occurred");
            }

        // Assuming `response` contains information about whether the OTP was successful
//        if (response.StatusCode == 200)
//        {
//            Console.WriteLine(response.User);
//            return Results.Ok(response);
//        }
//        else
//        {
//            return Results.BadRequest("Failed to authenticate OTP.");
//        }
    })
    .WithName("Authenticate OTP")
    .WithOpenApi();



app.Run();