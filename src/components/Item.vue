<template>

    <li class="list-group-item mb-2"><h5><b>ร้าน:</b> {{ placeName.Name_L }} ({{ placeName.Name_E }})</h5>
       <h5><b>ตำแหน่ง:</b> {{ placeName.AdminLevel4_L }} {{ placeName.AdminLevel3_L }} {{ placeName.AdminLevel1_L }}</h5> 
    </li>

</template>
<script>
export default {
    name: "item-list",
    props: ['placeName']
}
</script>
<style scoped>
.list-group-item{
    border-radius: 15px;
}
</style> 