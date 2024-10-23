from django.db import models


class Product(models.Model):
    product_id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey('users.User', on_delete=models.CASCADE)

    product_name = models.CharField(max_length=30)
    product_option = models.CharField(max_length=30)
    product_comment = models.CharField(max_length=100)
    product_image = models.CharField(max_length=1000)
    product_state = models.CharField(max_length=15)
    product_is_onboard = models.BooleanField(default=True)

    class Meta:
        db_table = 'products'
    
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)

    def __str__(self):
        return (
            f"Product{{\n"
            f"\tproduct_id='{self.product_id}',\n"
            f"\tuser_id='{self.user_id}',\n"
            f"\tproduct_name='{self.product_name}',\n"
            f"\tproduct_option='{self.product_option}',\n"
            f"\tproduct_image='{self.product_image}',\n"
            f"\tproduct_state='{self.product_state}',\n"
            f"\tproduct_is_onboard='{self.product_is_onboard}',\n"
            f"}}"
        )


#* top_sizes 상의/아우터
class TopSize(models.Model):
    top_size_id = models.AutoField(primary_key=True)
    product_id = models.OneToOneField(Product, on_delete=models.CASCADE)

    top_size_total = models.IntegerField()
    top_size_shoulder = models.IntegerField()
    top_size_chest = models.IntegerField()
    top_size_sleeve = models.IntegerField()

    class Meta:
        db_table = 'top_sizes'
    
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)

    def __str__(self):
        return (
            f"TopSize{{\n"
            f"\ttop_size_id='{self.top_size_id}',\n"
            f"\tproduct_id='{self.product_id}',\n"
            f"\ttop_size_total='{self.top_size_total}',\n"
            f"\ttop_size_shoulder='{self.top_size_shoulder}',\n"
            f"\ttop_size_chest='{self.top_size_chest}',\n"
            f"\ttop_size_sleeve='{self.top_size_sleeve}',\n"
            f"}}"
        )


#* bottom_sizes 하의
class BottomSize(models.Model):
    bottom_size_id = models.AutoField(primary_key=True)
    product_id = models.OneToOneField(Product, on_delete=models.CASCADE)

    bottom_size_total = models.IntegerField()
    bottom_size_waist = models.IntegerField()
    bottom_size_hip = models.IntegerField()
    bottom_size_thigh = models.IntegerField()
    bottom_size_rise = models.IntegerField()
    bottom_size_hem = models.IntegerField()

    class Meta:
        db_table = 'bottom_sizes'
    
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)

    def __str__(self):
        return (
            f"BottomSize{{\n"
            f"\tbottom_size_id='{self.bottom_size_id}',\n"
            f"\tproduct_id='{self.product_id}',\n"
            f"\tbottom_size_total='{self.bottom_size_total}',\n"
            f"\tbottom_size_waist='{self.bottom_size_waist}',\n"
            f"\tbottom_size_hip='{self.bottom_size_hip}',\n"
            f"\tbottom_size_thigh='{self.bottom_size_thigh}',\n"
            f"\tbottom_size_rise='{self.bottom_size_rise}',\n"
            f"\tbottom_size_hem='{self.bottom_size_hem}',\n"
            f"}}"
        )


#* skirt_sizes 원피스/치마 사이즈
class SkirtSize(models.Model):
    skirt_size_id = models.AutoField(primary_key=True)
    product_id = models.OneToOneField(Product, on_delete=models.CASCADE)

    skirt_size_total = models.IntegerField()
    skirt_size_shoulder = models.IntegerField()
    skirt_size_chest = models.IntegerField()
    skirt_size_sleeve = models.IntegerField()
    skirt_size_hip = models.IntegerField()
    skirt_size_waist = models.IntegerField()
    skirt_size_hem = models.IntegerField()

    class Meta:
        db_table = 'skirt_sizes'
    
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)

    def __str__(self):
        return (
            f"SkirtSize{{\n"
            f"\tskirt_size_id='{self.skirt_size_id}',\n"
            f"\tproduct_id='{self.product_id}',\n"
            f"\tskirt_size_total='{self.skirt_size_total}',\n"
            f"\tskirt_size_shoulder='{self.skirt_size_shoulder}',\n"
            f"\tskirt_size_chest='{self.skirt_size_chest}',\n"
            f"\tskirt_size_sleeve='{self.skirt_size_sleeve}',\n"
            f"\tskirt_size_hip='{self.skirt_size_hip}',\n"
            f"\tskirt_size_waist='{self.skirt_size_waist}',\n"
            f"\tskirt_size_hem='{self.skirt_size_hem}',\n"
            f"}}"
        )