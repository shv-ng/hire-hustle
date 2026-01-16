from dotenv import load_dotenv
from google import genai

from app.models import ContentType

_ = load_dotenv()

client = genai.Client()


def generate_job_assets(jd_text: str, user_bio: str, content_type: ContentType):
    """
    Generates high-conversion career assets using a role-specific strategy.
    """

    # We define specific instructions for each content type to ensure the LLM
    # understands the nuance between a resume and a cold email.
    type_specific_instructions = {
        ContentType.COLD_MAIL: (
            "Focus on a specific 'pain point' mentioned in the JD. "
            "The subject line must be catchy. The body should follow the 'Hook-Value-CTA' framework. "
            "Keep it under 150 words."
        ),
        ContentType.KEYWORDS: (
            "Identify the top 5 keywords in the JD. Rewrite the Bio's experience "
            "to quantify achievements (using the X-Y-Z formula: Accomplished [X] as measured by [Y], by doing [Z]). "
            "Ensure the tone is objective and data-driven."
        ),
        ContentType.REFERRAL_MESSAGE: (
            "Keep the tone warm but professional. Focus on why the referrer would feel "
            "confident vouching for me. Include a one-sentence 'blurb' they can copy-paste."
        ),
        ContentType.COVER_LETTER: (
            "Keep the tone warm but professional. Focus on why the referrer would feel "
            "confident vouching for me. Include a one-sentence 'blurb' they can copy-paste."
        ),
    }

    instructions = type_specific_instructions.get(
        content_type, "Write a professional career document."
    )

    prompt = f"""
    ### ROLE
    You are an elite Career Strategist and Executive Copywriter with a 100% success rate in getting candidates interviews at FAANG and Top-tier startups.

    ### INPUT DATA
    **User Background (Bio):** {user_bio}

    **Target Job Description (JD):** {jd_text}

    ### TASK
    Generate a high-impact **{content_type}**.
    
    ### STRATEGY & CONSTRAINTS
    1. **The 'Golden Thread':** Identify the 3 most critical skills/requirements in the JD. Explicitly link the User Bio to these 3 points.
    2. **Tone:** Professional, confident, and proactive. Avoid "fluff" words like 'passionate,' 'hardworking,' or 'synergy.'
    3. **Personalization:** Reference specific goals mentioned in the JD (e.g., "scaling the infrastructure" or "launching the EMEA market").
    4. **Formatting:** Use clean Markdown. For emails, include a 'Subject Line:' field.
    5. **Type-Specific Rules:** {instructions}

    ### OUTPUT STRUCTURE
    - Provide the final {content_type} text only.
    - No conversational filler (e.g., "Sure, here is your email...").
    - If there are missing details (like a name), use placeholders like [Hiring Manager Name] or [Company Name].
    """

    response = client.models.generate_content(
        model="gemini-2.0-flash",  # Note: Updated to the current stable high-performance model
        contents=prompt,
    )
    return response.text
