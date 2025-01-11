from django.db import models


class Outfit(models.Model):
    outfit_id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey('users.User', on_delete=models.CASCADE, db_column='user_id')

    outfit_title = models.CharField(max_length=50)
    outfit_image = models.CharField(max_length=1000)
    outfit_content = models.CharField(max_length=1000)
    is_public = models.BooleanField(default=False)

    class Meta:
        db_table = 'outfits'
    
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)

    def __str__(self):
        return (
            f"Outfit{{\n"
            f"\toutfit_id='{self.outfit_id}',\n"
            f"\tuser_id='{self.user_id}',\n"
            f"\toutfit_title='{self.outfit_title}',\n"
            f"\toutfit_image='{self.outfit_image}',\n"
            f"\toutfit_content='{self.outfit_content}',\n"
            f"\tis_public='{self.is_public}',\n"
            f"}}"
        )


class OutfitProduct(models.Model):
    outfit_product_id = models.AutoField(primary_key=True)
    outfit_id = models.ForeignKey(Outfit, on_delete=models.CASCADE, db_column='outfit_id')
    product_id = models.ForeignKey('products.Product', on_delete=models.CASCADE, db_column='product_id')

    class Meta:
        db_table = 'outfit_products'
    
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)

    def __str__(self):
        return (
            f"OutfitProduct{{\n"
            f"\toutfit_product_id='{self.outfit_product_id}',\n"
            f"\toutfit_id='{self.outfit_id}',\n"
            f"\tproduct_id='{self.product_id}',\n"
            f"}}"
        )