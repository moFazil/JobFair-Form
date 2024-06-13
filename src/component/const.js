const emailHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Registration Confirmation</title>
        <!-- Add your email styling here -->
        <style>
            /* Add your email styling here */
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #ffffff;
                border-radius: 10px;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            }
            .header {
                text-align: center;
                background-color: #861B47;
                color: #ffffff;
                padding: 10px;
                border-radius: 10px 10px 0 0;
            }
            .content {
                padding: 20px;
            }
            .footer {
                text-align: center;
                padding: 10px;
                background-color: #861B47;
                color: #ffffff;
                border-radius: 0 0 10px 10px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Registration Confirmation</h1>
            </div>
            <div class="content">
                <p>Dear ${formData.name},</p>
                <p>Thank you for registering with us. Your registration details have been successfully saved.</p>
                <p>Here are the details you provided:</p>
                <ul>
                    <li>Name: ${formData.name}</li>
                    <li>Email: ${formData.email}</li>
                    <!-- Include other details here -->
                </ul>
                <p>Best regards,</p>
                <p>Your Company Name</p>
            </div>
            <div class="footer">
                <p>&copy; ${new Date().getFullYear()} Your Company Name. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
`;
