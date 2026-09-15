<script setup>
import { contact } from '@/data/site'

const channels = [
  {
    icon: '📞',
    label: 'Gọi ngay',
    value: contact.phone,
    href: contact.phoneHref,
  },
  {
    icon: '💬',
    label: 'Zalo',
    value: 'Chat Zalo',
    href: contact.zalo,
  },
  {
    icon: '✉️',
    label: 'Email',
    value: contact.email,
    href: contact.emailHref,
  },
  {
    icon: '💌',
    label: 'Messenger',
    value: 'Nhắn tin',
    href: contact.messenger,
  },
]
</script>

<template>
  <section id="contact" class="contact">
    <div class="contact__glow contact__glow--1" aria-hidden="true" />
    <div class="contact__glow contact__glow--2" aria-hidden="true" />

    <div class="contact__inner">
      <div class="contact__intro reveal">
        <span class="contact__tag">Liên hệ</span>
        <h2>Bắt đầu thiệp cưới<br />của bạn hôm nay</h2>
        <p>
          Chọn mẫu ưng ý hoặc liên hệ trực tiếp — chúng tôi sẽ tư vấn miễn phí
          và hỗ trợ bạn setup thiệp nhanh nhất.
        </p>
        <p class="contact__address">📍 {{ contact.address }}</p>
      </div>

      <ul class="contact__channels reveal reveal-delay-1">
        <li
          v-for="(ch, i) in channels"
          :key="ch.label"
          class="contact__channel reveal-scale"
          :class="`reveal-delay-${i + 1}`"
        >
          <a :href="ch.href" target="_blank" rel="noopener noreferrer">
            <span class="contact__channel-icon">{{ ch.icon }}</span>
            <span>
              <strong>{{ ch.label }}</strong>
              <em>{{ ch.value }}</em>
            </span>
            <span class="contact__channel-arrow" aria-hidden="true">→</span>
          </a>
        </li>
      </ul>
    </div>

    <footer class="contact__footer">
      <p>© {{ new Date().getFullYear() }} Wedding Collection</p>
    </footer>
  </section>
</template>

<style scoped>
.contact {
  position: relative;
  padding: 80px 20px 0;
  background: linear-gradient(165deg, #fff5f9 0%, #fff 40%, #fdf4ff 100%);
  overflow: hidden;
}

.contact__glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  pointer-events: none;
}

.contact__glow--1 {
  width: 360px;
  height: 360px;
  top: -80px;
  right: -60px;
  background: rgba(236, 72, 153, 0.2);
  animation: glowFloat 8s ease-in-out infinite;
}

.contact__glow--2 {
  width: 280px;
  height: 280px;
  bottom: 120px;
  left: -80px;
  background: rgba(167, 139, 250, 0.18);
  animation: glowFloat 10s ease-in-out infinite reverse;
}

@keyframes glowFloat {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(20px, -16px); }
}

.contact__inner {
  position: relative;
  z-index: 1;
  max-width: 900px;
  margin: 0 auto;
  display: grid;
  gap: 36px;
}

.contact__tag {
  display: inline-block;
  padding: 6px 14px;
  border-radius: 999px;
  background: rgba(236, 72, 153, 0.12);
  color: #be185d;
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 16px;
}

.contact__intro {
  text-align: center;
}

.contact__intro h2 {
  margin: 0;
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(1.8rem, 5vw, 2.6rem);
  font-weight: 700;
  line-height: 1.2;
  color: #1a1020;
}

.contact__intro > p {
  margin: 20px auto 0;
  max-width: 520px;
  line-height: 1.75;
  color: #6b5060;
  font-size: 0.98rem;
}

.contact__address {
  margin: 16px 0 0;
  font-size: 0.92rem;
  font-weight: 600;
  color: #9d174d;
}

.contact__channels {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.contact__channel a {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 18px 16px;
  border-radius: 16px;
  background: #fff;
  border: 1px solid rgba(236, 72, 153, 0.1);
  text-decoration: none;
  box-shadow: 0 8px 28px rgba(26, 16, 32, 0.04);
  transition:
    transform 0.3s cubic-bezier(0.34, 1.4, 0.64, 1),
    box-shadow 0.3s ease,
    border-color 0.3s ease;
}

.contact__channel a:hover {
  transform: translateY(-4px) scale(1.02);
  border-color: rgba(236, 72, 153, 0.25);
  box-shadow: 0 16px 40px rgba(190, 24, 93, 0.12);
}

.contact__channel-icon {
  font-size: 1.4rem;
  flex-shrink: 0;
}

.contact__channel strong {
  display: block;
  font-size: 0.88rem;
  font-weight: 700;
  color: #1a1020;
}

.contact__channel em {
  display: block;
  font-style: normal;
  font-size: 0.8rem;
  color: #9ca3af;
  margin-top: 2px;
}

.contact__channel-arrow {
  margin-left: auto;
  color: #be185d;
  font-weight: 700;
  transition: transform 0.25s ease;
}

.contact__channel a:hover .contact__channel-arrow {
  transform: translateX(4px);
}

.contact__footer {
  position: relative;
  z-index: 1;
  margin-top: 56px;
  padding: 24px 20px 32px;
  text-align: center;
  border-top: 1px solid rgba(236, 72, 153, 0.1);
}

.contact__footer p {
  margin: 0;
  font-size: 0.82rem;
  color: #a07085;
}

@media (max-width: 560px) {
  .contact {
    padding-top: 64px;
  }

  .contact__channels {
    grid-template-columns: 1fr;
  }
}
</style>
