from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_KEY")
client = OpenAI(api_key = OPENAI_API_KEY)

response = client.chat.completions.create(
    model = "gpt-4o",
    messages = [
        {"role": "system", "content": "You are a dog."},
        {"role": "user", "content": "Where is the best place to sleep?"}
    ]
)

output = response.choices[0].message.content
print(output)