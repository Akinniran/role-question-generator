from rest_framework import generics, status
from rest_framework.response import Response
from .serializers import InterviewQuestionSerializer

from openai import OpenAI
from django.conf import settings

import json


client = OpenAI(
    base_url="https://models.inference.ai.azure.com",
    api_key=settings.GITHUB_TOKEN,
)


class GenerateInterviewQuestionsAPIView(generics.GenericAPIView):

    serializer_class = InterviewQuestionSerializer

    def post(self, request, *args, **kwargs):

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        job_title = serializer.validated_data["job_title"]

        try:

            response = client.chat.completions.create(
                model="gpt-5",
                messages=[
                    {
                        "role": "system",
                        "content": (
                            "You are an interview preparation assistant."
                        ),
                    },
                    {
                        "role": "user",
                        "content": f"""
                        Generate exactly 3 thoughtful interview questions
                        for a {job_title} role.

                        Return ONLY valid JSON in this format:

                        [
                            "Question 1",
                            "Question 2",
                            "Question 3"
                        ]
                        """,
                    },
                ],
            )

            content = response.choices[0].message.content

            questions = json.loads(content)

            return Response(
                {
                    "job_title": job_title,
                    "questions": questions,
                },
                status=status.HTTP_200_OK,
            )

        except Exception as e:

            return Response(
                {
                    "error": str(e),
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )