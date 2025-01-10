from django.db import models


class Hashtag(models.Model):
    hashtag_id = models.AutoField(primary_key=True)
    hashtag_name = models.CharField(max_length=50, unique=True)

    class Meta:
        db_table = 'hashtags'

    def __str__(self):
        return (
            f"Hashtag{{\n"
            f"\thashtag_id='{self.hashtag_id}',\n"
            f"\thashtag_name='{self.hashtag_name}',\n"
            f"}}"
        )


class ProductHashtag(models.Model):
    product_hashtag_id = models.AutoField(primary_key=True)
    product_id = models.ForeignKey('products.Product', on_delete=models.CASCADE, db_column='product_id')
    hashtag_id = models.ForeignKey(Hashtag, on_delete=models.CASCADE, db_column='hashtag_id')

    class Meta:
        db_table = 'product_hashtags'

    def __str__(self):
        return (
            f"ProductHashtag{{\n"
            f"\tproduct_hashtag_id='{self.product_hashtag_id}',\n"
            f"\tproduct_id='{self.product_id}',\n"
            f"\thashtag_id='{self.hashtag_id}',\n"
            f"}}"
        )


class OutfitHashtag(models.Model):
    outfit_hashtag_id = models.AutoField(primary_key=True)
    outfit_id = models.ForeignKey('outfits.Outfit', on_delete=models.CASCADE, db_column='outfit_id')
    hashtag_id = models.ForeignKey(Hashtag, on_delete=models.CASCADE, db_column='hashtag_id')

    class Meta:
        db_table = 'outfit_hashtags'

    def __str__(self):
        return (
            f"OutfitHashtag{{\n"
            f"\toutfit_hashtag_id='{self.outfit_hashtag_id}',\n"
            f"\toutfit_id='{self.outfit_id}',\n"
            f"\thashtag_id='{self.hashtag_id}',\n"
            f"}}"
        )