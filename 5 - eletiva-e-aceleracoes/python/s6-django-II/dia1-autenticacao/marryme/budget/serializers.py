from rest_framework import serializers
from .models import Vendor, Marriage, Budget


class VendorSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Vendor
        fields = ["id", "name", "price"]


class BudgetSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(
        read_only=True, default=serializers.CurrentUserDefault()
    )

    class Meta:
        model = Budget
        fields = ["id", "vendors", "marriage", "user"]


class NestedBudgetSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(
        read_only=True, default=serializers.CurrentUserDefault()
    )

    class Meta:
        model = Budget
        fields = ["id", "vendors", "user"]


class MarriageSerializer(serializers.ModelSerializer):
    budget = NestedBudgetSerializer()
    user = serializers.PrimaryKeyRelatedField(
        read_only=True, default=serializers.CurrentUserDefault()
    )

    class Meta:
        model = Marriage
        fields = ["id", "codename", "date", "budget", "user"]

    def create(self, validated_data):
        budget_data = validated_data.pop("budget")
        budget_data["marriage"] = Marriage.objects.create(**validated_data)
        BudgetSerializer().create(validated_data=budget_data)
        return budget_data["marriage"]


class AdminVendorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vendor

        fields = "__all__"

    def create(self, validated_data):
        # Recupera o user que fez a requisição

        current_user = self.context["request"].user

        """

       Recupera os dados de budget da requisição, acrescenta a eles

       e aos dados de Marriage os dados do usuário

       """

        budget_data = validated_data.pop("budget")

        budget_data["user"] = current_user

        validated_data["user"] = current_user

        # Cria marriage, cria budget e retorna Marriage, como a função pede

        budget_data["marriage"] = Marriage.objects.create(**validated_data)

        BudgetSerializer().create(validated_data=budget_data)

        return budget_data["marriage"]
