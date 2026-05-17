from rest_framework import serializers

class InterviewQuestionSerializer(serializers.Serializer):
    job_title = serializers.CharField(max_length=255)