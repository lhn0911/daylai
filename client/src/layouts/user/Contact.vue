<template>
  <div>
    <HeaderEnterprise></HeaderEnterprise>
    <div class="relative h-[435px] flex items-center justify-center text-white">
      <div
        class="absolute inset-0 bg-cover bg-center image-banner"
        style="
          background-image: url('https://s3-alpha-sig.figma.com/img/7159/2634/66e885925c95e62998ec3ac4d53c19e4?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=L6D~ZDKiszeTGw2L6nj6xoMotbdb0v5HGsfU-WRoS~X98hlwkRkiv749ZddMRBGPA4FgIPqfA6MT2Ndq2es3OjR8Zienr8XbZ1jYlxd4R8imcLRX3gA4TB~RrdNpaf3nv3df-g-dDmUPGIzZuaEiNerOirx6Iv34NbYfYcfBKKBR4r7FxBKD6NrCVCpuRmRgK8Hjbo7pknhZj234gweiGopb~uxhRvTCIZsLrp-ppkGVhJuEq1SLF0Ht8rW5jZ3Mn006gM2G25vb7SS11aQGOG9tjGrU495cEPOjqAx3tOTZR~AkurSuW-lvGfrYBqviH-7Wy0UF~tt-kV6o0Sr1oQ__');
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
            Liên Hệ
          </p>
          <p
            class="text-[16px] text-[rgba(255,255,255,1)] mb-0 whitespace-nowrap"
          >
            Kết nối với Rikkei Jobs để gia tăng cơ hội việc làm
          </p>
        </div>
      </div>
    </div>
    <main class="contact-page">
      <div class="container">
        <h1>Kết nối với chúng tôi</h1>
        <img
          class="absolute top-[650px] left-[-200px] z-[-1] mt-[-400px]"
          src="../../images/bg_register.png"
          alt=""
        />
        <p class="subtitle">
          Kết nối với Rikkei Jobs để gia tăng cơ hội việc làm
        </p>
        <div class="content">
          <div class="offices">
            <div class="office" v-for="office in offices" :key="office.city">
              <h2>{{ office.city }}</h2>
              <div class="meta-item">
                <div>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_40_10672)">
                      <path
                        d="M10.3105 4.225C9.78554 1.915 7.77054 0.875 6.00054 0.875C6.00054 0.875 6.00054 0.875 5.99554 0.875C4.23054 0.875 2.21054 1.91 1.68554 4.22C1.10054 6.8 2.68054 8.985 4.11054 10.36C4.64054 10.87 5.32054 11.125 6.00054 11.125C6.68054 11.125 7.36054 10.87 7.88554 10.36C9.31554 8.985 10.8955 6.805 10.3105 4.225ZM6.00054 6.73C5.13054 6.73 4.42554 6.025 4.42554 5.155C4.42554 4.285 5.13054 3.58 6.00054 3.58C6.87054 3.58 7.57554 4.285 7.57554 5.155C7.57554 6.025 6.87054 6.73 6.00054 6.73Z"
                        fill="#AB1F24"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_40_10672">
                        <rect width="12" height="12" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <div>
                  <strong>Trụ sở:</strong>
                  {{ office.address }}
                </div>
              </div>
              <div class="meta-item">
                <div>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.5 1.75H3.5C2 1.75 1 2.5 1 4.25V7.75C1 9.5 2 10.25 3.5 10.25H8.5C10 10.25 11 9.5 11 7.75V4.25C11 2.5 10 1.75 8.5 1.75ZM8.735 4.795L7.17 6.045C6.84 6.31 6.42 6.44 6 6.44C5.58 6.44 5.155 6.31 4.83 6.045L3.265 4.795C3.105 4.665 3.08 4.425 3.205 4.265C3.335 4.105 3.57 4.075 3.73 4.205L5.295 5.455C5.675 5.76 6.32 5.76 6.7 5.455L8.265 4.205C8.425 4.075 8.665 4.1 8.79 4.265C8.92 4.425 8.895 4.665 8.735 4.795Z"
                      fill="#AB1F24"
                    />
                  </svg>  
                </div>
                  <div>
                                      <b>Email:</b>
                <a> {{ office.email }}</a>
                  </div>

              </div>
              <div class="meta-item">
                <div>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.525 7.475L4.6 8.4C4.405 8.595 4.095 8.595 3.895 8.405C3.84 8.35 3.785 8.3 3.73 8.245C3.215 7.725 2.75 7.18 2.335 6.61C1.925 6.04 1.595 5.47 1.355 4.905C1.12 4.335 1 3.79 1 3.27C1 2.93 1.06 2.605 1.18 2.305C1.3 2 1.49 1.72 1.755 1.47C2.075 1.155 2.425 1 2.795 1C2.935 1 3.075 1.03 3.2 1.09C3.33 1.15 3.445 1.24 3.535 1.37L4.695 3.005C4.785 3.13 4.85 3.245 4.895 3.355C4.94 3.46 4.965 3.565 4.965 3.66C4.965 3.78 4.93 3.9 4.86 4.015C4.795 4.13 4.7 4.25 4.58 4.37L4.2 4.765C4.145 4.82 4.12 4.885 4.12 4.965C4.12 5.005 4.125 5.04 4.135 5.08C4.15 5.12 4.165 5.15 4.175 5.18C4.265 5.345 4.42 5.56 4.64 5.82C4.865 6.08 5.105 6.345 5.365 6.61C5.415 6.66 5.47 6.71 5.52 6.76C5.72 6.955 5.725 7.275 5.525 7.475Z"
                      fill="#AB1F24"
                    />
                    <path
                      d="M10.9858 9.16499C10.9858 9.30499 10.9608 9.44999 10.9108 9.58999C10.8958 9.62999 10.8808 9.66999 10.8608 9.70999C10.7758 9.88999 10.6658 10.06 10.5208 10.22C10.2758 10.49 10.0058 10.685 9.70078 10.81C9.69578 10.81 9.69078 10.815 9.68578 10.815C9.39078 10.935 9.07078 11 8.72578 11C8.21578 11 7.67078 10.88 7.09578 10.635C6.52078 10.39 5.94578 10.06 5.37578 9.64499C5.18078 9.49999 4.98578 9.35499 4.80078 9.19999L6.43578 7.56499C6.57578 7.66999 6.70078 7.74999 6.80578 7.80499C6.83078 7.81499 6.86078 7.82999 6.89578 7.84499C6.93578 7.85999 6.97578 7.86499 7.02078 7.86499C7.10578 7.86499 7.17078 7.83499 7.22578 7.77999L7.60578 7.40499C7.73078 7.27999 7.85078 7.18499 7.96578 7.12499C8.08078 7.05499 8.19578 7.01999 8.32078 7.01999C8.41578 7.01999 8.51578 7.03999 8.62578 7.08499C8.73578 7.12999 8.85078 7.19499 8.97578 7.27999L10.6308 8.45499C10.7608 8.54499 10.8508 8.64999 10.9058 8.77499C10.9558 8.89999 10.9858 9.02499 10.9858 9.16499Z"
                      fill="#AB1F24"
                    />
                  </svg>
                </div>
                <div>
                  <span>
                    <b>Điện thoại:</b>
                  </span>
                  <a> {{ office.phone }}</a>
                </div>
              </div>
            </div>
          </div>
          <div class="image">
            <img
              src="https://s3-alpha-sig.figma.com/img/df8c/a7d2/9e13f54b7242c25fc57e5eec9f57d0b2?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=PyXIl7Hg2qtmPINwGSB911YuZeCDnjo0kRV~UrmguO7elaRRYjpb7AmJLJtxsbv6m6636oQjNcEXf3YHpJZnNQwiU~PDYyhUQjoAVXOAMgBbeepuKqQGvd7jZlCFf-b1Ivlj2zdc0Q~j~FPCUNLFUm28-5av8D-sbl2W-AvYRaUA33oc0Mwb0PStn~WK8dBIjUwJhFxKaSLV5l142cdl59DkWCMA7CCG8E2~9tHMujAnInIsso8NE0djQ9d5KRl8qZSoIHJf6J~RX5WXECu7lhLv3KoPIQUlMK9Uf47XtYCVlak62TWqlw-PtogUW26FA~ReDalRIFbP2MB06g5l5w__"
              alt="Team photo"
            />
          </div>
        </div>
      </div>
    </main>
    <FooterEnterprise></FooterEnterprise>
  </div>
</template>

<script setup>
import HeaderEnterprise from "../enterprise/HeaderEnterprise.vue";
import FooterEnterprise from "../enterprise/FooterEnterprise.vue";
const offices = [
  {
    city: "Hà Nội",
    address:
      "Tầng 21, Tòa nhà Handico, Đ. Phạm Hùng, Q. Nam Từ Liêm, Hà Nội, Việt Nam",
    email: "tuyendung@rikkeijobs.com",
    phone: "+84 243 6231 685",
  },
  {
    city: "Hồ Chí Minh",
    address:
      "Tòa nhà Đảm Bảo An Toàn Hàng Hải phía Nam Số 42 đường Tự Cường, Phường 4, Quận Tân Bình, TP. Hồ Chí Minh, Việt Nam",
    email: "tuyendung.hcm@rikkeijobs.com",
    phone: "+84 243 6231 685",
  },
  {
    city: "Đà Nẵng",
    address:
      "Tầng 11 Tòa nhà Thông Tấn Xã Việt Nam, 81 Quang Trung, Q. Hải Châu, Đà Nẵng",
    email: "tuyendung.dn@rikkeijobs.com",
    phone: "+84 23 696 2685",
  },
  {
    city: "Nhật Bản",
    address:
      "3F, Tamachi 16th Fujishima Building, 4-13-4 Shiba, Minato-ku, Tokyo, Japan",
    email: "tuyendung.hcm@rikkeijobs.com",
    phone: "+81 3-6435-0754",
  },
];
</script>

<style scoped>
.contact-page {
  font-family: Arial, sans-serif;
  color: #333;
  padding: 20px;
}

.container {
  max-width: 1200px;
  margin: auto;
  text-align: center;
}

h1 {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 10px;
}

.subtitle {
  color: #666;
  margin-bottom: 30px;
}

.content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
}

.offices {
  flex: 1;
}

.office {
  margin-bottom: 20px;
  text-align: left;
}

h2 {
  font-size: 20px;
  color: #e63946;
}

a {
  color: #e63946;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

.image {
  flex: 1;
}

.image img {
  width: 888px;
  height: 800px;
  top: 588px;
  left: 732px;
  gap: 0px;
  border-radius: 12px 0px 0px 0px;
  opacity: 0px;
}
.meta-item{
    display: flex;
    justify-content: center;
    align-content: center;
}
</style>
