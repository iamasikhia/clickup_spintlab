from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_KEY")
client = OpenAI(api_key = OPENAI_API_KEY)

task = "UI/UX Design"
rate = "75"
hours = "3.0"
client_name = "John Doe"
client_email = "jdoe@example.com"
extra_notes = "10% discount for first time clients"

response = client.chat.completions.create(
    model = "gpt-4o",
    messages = [
        {"role": "system", "content": "Generate a smart, optimal invoice for freelancers and project managers based on the query given. Keep the description short with no emojis or flowering. Use USD currency. Format the invoice in markdown with a table including columns for Task, Hours, Rate, and Total Price. Include Client full name, Client email, and any Extra notes provided. Provide a simple thank you note at the end of the invoice. Be professional. For now, include a simple flat tax rate of 0% and a sample invoice number and sample payment link."},
        {"role": "user", "content": f"ClickUp Task: {task}. Rate: {hours} hours @ ${rate}/hr. ${float(hours) * float(rate)} total price. Client full name: {client_name}. Client email: {client_email}. Extra notes: {extra_notes}."}
    ]
)

output = response.choices[0].message.content
print(output)