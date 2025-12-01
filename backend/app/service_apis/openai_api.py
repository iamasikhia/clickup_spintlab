from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_KEY")
client = OpenAI(api_key = OPENAI_API_KEY)

def return_output(title, time, rate, logs):

    response = client.chat.completions.create(
        model = "gpt-4o",
        messages = [
            {"role": "system", "content": "Generate a smart, contextual billing description for a freelancer/project manager based on the query given. Keep the description short and utmost professional with no emojis or flowering. Use USD currency. Be professional. Follow this prompt rigorously and do not deviate. An example description is \"Professional web development services for the new company website.\""},
            {"role": "user", "content": f"ClickUp Task: {str(title)}. Rate: {str(time)} hours @ ${str(rate)}/hr. ${str(float(time) * float(rate))} total price."}
        ]
    )

    output = response.choices[0].message.content
    return output