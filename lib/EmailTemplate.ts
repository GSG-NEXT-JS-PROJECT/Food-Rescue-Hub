import { EmailTemplateProps } from "@/@types/index";

export const EmailTemplate = ({ link, title, description, secondary, button }: EmailTemplateProps) => {
    return `
    <html>
    <head>
        <style>
            body {
            font-family: Arial, sans-serif;
            background-color: #f2f2f2;
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
            margin-top: 50px;
            }

            h1 {
            color: #333333;
            text-align: center;
            }
    
            p {
            color: #666666;
            line-height: 1.5;
            text-align: center;
            }

            a.button {
            display: block;
            margin: 0 auto;
            padding: 10px 20px;
            background-color: #047857;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
            border: 2px solid #047857;
            text-align: center; 
            font-weight: bold;
            font-size: 18px;
            }

            .expire-time {
            text-align: center;
            margin-top: 10px;
            color: #999999;
            }

            .button:hover {
            background-color: #fff;
            border: 2px solid #047857;
            color: #047857;
            transition: all 0.3s ease;
            }
        </style>
    </head>
    <body>
        <div class="container">
        <h1>${title}</h1>
        <p>
        ${description}
        </p>
        <a href=${link} class="button">${button}</a>
        <p class="expire-time"> ${secondary}</p>
        </div>
    </body>
    </html>

    `;
};