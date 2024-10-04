using System;
using Stytch;
using Stytch.net.Clients;
using Stytch.net.Models.Consumer;
using Stytch.net.Exceptions;
using DotNetEnv;

Env.Load();


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


var projectId = Environment.GetEnvironmentVariable("STYTCH_PROJECT_ID");
var projectSecret = Environment.GetEnvironmentVariable("STYTCH_SECRET");
var environment = Environment.GetEnvironmentVariable("STYTCH_ENVIRONMENT");
if (string.IsNullOrEmpty(projectId) || string.IsNullOrEmpty(projectSecret) || string.IsNullOrEmpty(environment))
{
    throw new InvalidOperationException("Environment variables for Stytch are not set.");
}

var client = new ConsumerClient(new ClientConfig
{
    ProjectId = projectId,
    ProjectSecret = projectSecret,
    Environment = environment
});

app.MapGet("/send_otp", async (string email) =>
{
    
    if (string.IsNullOrEmpty(email))
    {
        return Results.BadRequest("email code is required.");
    }

     var request = new OTPsEmailLoginOrCreateRequest {
        Email = email,
     };

     var response = await client.OTPs.Email.LoginOrCreate(request);
    
     return Results.Ok(response);
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
    })
    .WithName("Authenticate OTP")
    .WithOpenApi();



app.Run();