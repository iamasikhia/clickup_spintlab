from openai import OpenAI
import os
from dotenv import load_dotenv
from fpdf import FPDF

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_KEY")
client = OpenAI(api_key = OPENAI_API_KEY)
pdf = FPDF()

def return_output(title, time, rate, logs):

    response = client.chat.completions.create(
        model = "gpt-4o",
        messages = [
            {"role": "system", "content": "Generate a smart, contextual billing description for a freelancer/project manager based on the query given. Keep the description short and utmost professional with no emojis or flowering. Use USD currency. Provide a simple thank you note at the end of the invoice. Be professional. For now, include a simple flat tax rate of 0% and a sample invoice number and sample payment link."},
            {"role": "user", "content": f"ClickUp Task: {str(title)}. Rate: {str(time)} hours @ ${str(rate)}/hr. ${str(float(time) * float(rate))} total price."}
        ]
    )

    output = response.choices[0].message.content
    return output

"""
pdf.add_page()
pdf.set_font('Helvetica', size = 12)
pdf.cell(text = client_email, ln = True)
pdf.output("invoice.pdf")
"""

# You can create a class for footers/headers/etc and add more things.
# Docs are here: https://py-pdf.github.io/fpdf2/Tutorial.html