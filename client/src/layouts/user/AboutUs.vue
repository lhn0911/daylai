<template>
  <div>
    <HeaderEnterprise />
    <div class="relative h-[435px] flex items-center justify-center text-white">
      <div
        class="absolute inset-0 bg-cover bg-center image-banner"
        style="
          background-image: url('https://s3-alpha-sig.figma.com/img/b0b8/1555/5aa35e46a32f52c6f849aeb687067af2?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=BE6iBkBhk-x41V6Y0Bf0QqhyJ1LBIsViAEEhm6WEM~Z~wd7pNasLuJ5Ce0yQngleXwnzoipykO42sVlFanE54e8ihvVV2YcJN-ShvzfLWZPMzZviByjbkjpTxVWZUM8GSm5s2hMVG4x9ON4Ylqfq0WP4NNaItEL2KsCtNPKYmE3O-vjiXPE9mPtbkSM4Ez9Y6OIVvO4-LToE~Gw3SlaRnngovwhXkrrE0XfCeCfK0T59Y10aCAcGLqDBOLznmnmtUHv4s6eHFjnDJH2MR8cCbwIZrifTJww60SHjJE9i3SNu925BA2AbZdvAzj~4Fu7OnHTKxhLa88DaZxTb5O-jLw__');
          background-position: cover;
          background-size: 100% 260%;
          /* height: 100%; */
        "
      ></div>

      <div
        style="
          background: linear-gradient(
            rgba(19, 12, 45, 1),
            rgba(35, 22, 81, 1),
            rgba(35, 22, 81, 1),
            rgba(19, 12, 45, 1)
          );
        "
        class="absolute inset-0 opacity-50"
      ></div>

      <!-- Nội dung phía trước -->
      <div
        class="relative flex flex-col w-[341px] h-[76px] gap-[4px] mt-[10px]"
      >
        <div>
          <p
            class="text-[rgba(255,255,255,1)] text-[40px] h-[48px] font-bold flex justify-center mb-3"
          >
            Về chúng tôi
          </p>
          <p
            class="text-[16px] text-[rgba(255,255,255,1)] mb-0 whitespace-nowrap"
          >
            Rikkeisoft - Top 3 Doanh nghiệp CNTT tại Việt Nam
          </p>
        </div>
      </div>
    </div>
    <div class="w-[1400px] h-[474px] pt-10 pb-80 ml-auto ">
  <div class="flex justify-end items-center gap-[126px] px-[120px]">
    <div class="w-[486px] flex flex-col space-y-[24px]">
      <div class="text-center">
        <p class="font-bold text-[32px] mb-1 text-[rgba(17,17,17,1)]">
          CÔNG TY CỔ PHẦN RIKKEISOFT
        </p>
        <p class="text-[rgba(80,80,0,1)]">
          Top 3 Doanh nghiệp CNTT tại Việt Nam
        </p>
      </div>
      <div>
        <p class="text-[rgba(80,80,0,1)] text-center">
          Thành lập năm 2012, Rikkeisoft đã trở thành một trong những doanh
          nghiệp công nghệ hàng đầu tại Việt Nam và Nhật Bản với gần 2.000
          thành viên. Bằng việc cung cấp các giải pháp công nghệ toàn diện
          như AI, Robotics, Blockchain và chuyển đổi số, Rikkeisoft đang góp
          phần nâng cao năng lực cạnh tranh của doanh nghiệp Việt trên
          trường quốc tế. Hiện tại Rikkeisoft đã hiện diện tại nhiều quốc
          gia trên thế giới như Mỹ, Nhật Bản, Singapore, Hàn Quốc và Thái
          Lan, ... góp phần đưa công nghệ Việt Nam vươn tầm quốc tế.
        </p>
      </div>
    </div>
    <div class="w-[584px]">
      <img
        class="rounded-md w-full h-auto"
        src="https://s3-alpha-sig.figma.com/img/d9bd/6398/25319407681a7e926336fefb98d451aa?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=X1Jt6lFlaIiNfIjvvc0YVeTyXVBflf3EpeauEUZ~rq9Lu5YHqjEZIbhAOngN00ORFnqqzsxqK6Iq-id9aRfUALAnebICZP-dK6EP24boO87dg0jAORYt3HfI76AsToNVLd9HVzQ0RpyCxTc0T6DBI1FjD6R414bGJD8RlTkwZlI22Gm6wU1unMAGy8y0ABm5tGkvnfh39~Xf-rAp2UHsLCiv84MBAVScF0j25W~V1~OcWjzibrX8Zbhj8dx3oDbC~ai4qF1Yv3BYXhaQpDTJwKbadOvQedkPGmlK-fM4SRSXmIjtdlmdL9B0SXCwlCKF1ZI6SSLRIfokHTAsaeHDag__"
        alt=""
      />
    </div>
  </div>
  <img
    class="absolute top-[650px] left-0 z-[-1]"
    src="../../images/bg_register.png"
    alt=""
  />
</div>

    <div
      class="w-full h-[408px]"
      style="
        background-image: url('https://s3-alpha-sig.figma.com/img/2250/f891/827ff07cd21ae1be104e11e1b601b7c4?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=nb0T7dZK4No4k6kI~7sFHv~n3YuNtD4snUh572QFas-2f-PIAcdgVCK1rZiPLFF2QAHNMUhdyFqya4XC~RSQUD6qiulAtkuqUAMHEdfM7WI2k8Ht-FmPeFjeV~ke43S~e-yZWkVvTlVPfZwC6GLq8wA7B9ooe7f1Cx0JjofPJNCujy1iMkUqnZcx2oBGK-pOUVdohEA-66PzEOP6deKvbLpDl1pwNT6qHOCpBxqWk4Khuh3N1MGsSlq0PPz5h~u6Qzvg0cUMJdN5li17sndsSa7nACUX0Jy4i4FuXS7eOZYlASZVDr-ThTZl5QPLg~uEAaxXcSmq~3H0Oj~tYRmBug__');
      "
    >
      <div
        class="relative w-[1200px] h-[108px] flex top-[80px] left-[120px] gap-[34px]"
      >
        <div
          class="w-[379px] h-[108px] bg-[rgba(250,250,250,1)] px-[24px] py-[12px] rounded-md"
        >
          <b class="text-[16px] text-[rgba(80,80,80,1)] font-semibold mt-0">
            Số lượng nhân viên
          </b>
          <p class="text-[48px] text-[rgba(188,34,40,1)] font-bold mb-0">
            2000
          </p>
        </div>
        <div
          class="w-[379px] h-[108px] bg-[rgba(250,250,250,1)] px-[24px] py-[12px] rounded-md"
        >
          <b class="text-[16px] text-[rgba(80,80,80,1)] font-semibold">
            Dự án đã thực hiện
          </b>
          <p class="text-[48px] text-[rgba(188,34,40,1)] font-bold mb-0">
            1000
          </p>
        </div>
        <div
          class="w-[379px] h-[108px] bg-[rgba(250,250,250,1)] px-[24px] py-[12px] rounded-md"
        >
          <b class="text-[16px] text-[rgba(80,80,80,1)] font-semibold">
            Khách hàng
          </b>
          <p class="text-[48px] text-[rgba(188,34,40,1)] font-bold mb-0">
            500+
          </p>
        </div>
      </div>
      <div
        class="relative w-[1200px] h-[108px] flex top-[120px] left-[120px] gap-[34px]"
      >
        <div
          class="w-[379px] h-[108px] bg-[rgba(250,250,250,1)] px-[24px] py-[12px] rounded-md"
        >
          <b class="text-[16px] text-[rgba(80,80,80,1)] font-semibold">
            Số năm kinh nghiệm
          </b>
          <p class="text-[48px] text-[rgba(188,34,40,1)] font-bold mb-0">12</p>
        </div>
        <div
          class="w-[379px] h-[108px] bg-[rgba(250,250,250,1)] px-[24px] py-[12px] rounded-md"
        >
          <b class="text-[16px] text-[rgba(80,80,80,1)] font-semibold">
            Văn phòng đại diện tại các thành phố
          </b>
          <p class="text-[48px] text-[rgba(188,34,40,1)] font-bold mb-0">10</p>
        </div>
        <div
          class="w-[379px] h-[108px] bg-[rgba(250,250,250,1)] px-[24px] py-[12px] rounded-md"
        >
          <b class="text-[16px] text-[rgba(80,80,80,1)] font-semibold">
            Tỷ lệ giữ chân khách hàng
          </b>
          <p class="text-[48px] text-[rgba(188,34,40,1)] font-bold mb-0">97%</p>
        </div>
      </div>
    </div>
    <div class="w-full h-[892px] px-[200px] py-[80px] gap-[48px] flex flex-col">
      <div class="flex justify-center">
        <b
          class="w-[322px] h-[40xp] text-[32px] text-[rgba(17,17,17,1)] font-bold"
          >Văn phòng đại diện</b
        >
      </div>
      <div>
        <img
          class="w-[1024px] h-[644px]"
          src="https://s3-alpha-sig.figma.com/img/ff9e/c123/c0debbfa7fba284175b53bd9990a8f9c?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=LS8ct6aAXciVUkIuxILL9pLnjDwhloTKZ~l~aapA7eAyk8X5J7rfJnIFSJtieSj2Jg1wHQV13HKKKt8t6csg5GIchalG60LOvHU6cKWaYnxF2IK6ySkhoW7ASns7fwgquCMMvmfSovMB4tJQKymvhgDJw-l6s9UaGGmUUwe5-GwAGziteABVJOheTBqxMll7V1~TwG5gsBxslTzQ9zq9QDGcMKO9QTWUAXNR4m6tjbBTIxyJT4qv7XBEE81ARc-hpz5pviZjMHRITmWiUA6LzbcYlrvQZhzMxaVqtDOAz491iJnD1YSrKhRdHMpr536QImhBHI-HPg-XBvuKZpN0iQ__"
          alt=""
        />
      </div>
    </div>
    <div class="w-full h-[921px] relative">
      <div class="w-[1300px] h-[40px] mt-[84px] ml-[120px] flex justify-center">
        <b class="text-[rgba(17,17,17,1)] text-[32px] mb-0 font-bold"
          >HỆ SINH THÁI RIKKEISOFT</b
        >
      </div>
      <div>
        <div class="main-logo">
          <img src="../../images/hesinhthai.png" alt="Rikkei Main Logo" />
        </div>
      </div>
      <div class="absolute top-0 right-0 z-[-1]">
        <img src="../../images/bg_register.png" alt="" />
      </div>
    </div>
    <FooterEnterprise />
  </div>
</template>

<script setup>
import HeaderEnterprise from "../enterprise/HeaderEnterprise.vue";
import FooterEnterprise from "../enterprise/FooterEnterprise.vue";
</script>

<style scoped>
/* .image-banner {
  background-image: linear-gradient(
      to bottom,
      rgba(25, 16, 58, 0.6) rgba(25, 16, 58, 0.5)
    ),
    url("https://s3-alpha-sig.figma.com/img/b0b8/1555/5aa35e46a32f52c6f849aeb687067af2?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=R9gdzCvLDumgeInrUkhxqa41LU8y3fFk-S8lKtfXePV2nNpAxnfX3Jr48p91WJKkrF9tXQJ7maIprX19UCTWFu7a~uFaJkgqiMjqSmJUviF3GzSPJIHOiJf9aLHDPZryrTg59KDVwiUurQL2s8GuJ2VucQJxHYOkbvD96wwa2gpyWupxYalX9YKsNpT5TgRukl4Be~-fDOlkarCdLy2qCAZL6NaIeymPWv29vQe8Cz2H45mK7deTK5qpWweLImdAF2hoAc6hwXgB4Bdty4fU1dFvhFK-iGBpn5ZdzjzxTfXi~bpOYsftgPv47DF50TZpvLn3YZEL2R44oEjKKcKK6g__");
} */

.title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
}

.main-logo {
  position: absolute;
  transform: translate(15%, 20%);
  width: 1200px;
  height: 649px;
}
</style>
