export default function App() {
  const focusAreas = [
    {
      title: 'Device Validation',
      description:
        '실디바이스 기반 AI 모델, 플랫폼, 적용 시나리오의 실행 가능성과 적합성을 검증합니다.',
    },
    {
      title: 'Physical AI Enablement',
      description:
        '디바이스, 플랫폼, 모델을 연결하는 적용 구조를 설계하고 PoC와 협업 프레임을 구체화합니다.',
    },
    {
      title: 'Platformization & Business Development',
      description:
        '기술 자산을 제안, 협업, 실증, 사업개발 기회로 연결하는 실행 중심 구조를 제공합니다.',
    },
  ]

  const domains = [
    'On-Device AI',
    'Device Farm / Validation Platform',
    'Embedded / Edge AI',
    'Automotive / Mobility',
    'Smart Devices / Wearables',
    'AI Platform Commercialization',
  ]

  const collaborationTargets = [
    'AI / 반도체 / 플랫폼 기업',
    '디바이스 및 시스템 기업',
    'PoC와 실증이 필요한 스타트업',
    '기술사업화 및 검증 협업이 필요한 고객',
    '정부과제 및 공동 제안 파트너',
  ]

  return (
    <main className="site-shell">
      <section className="hero-bg">
        <div className="bg-orb orb-left"></div>
        <div className="bg-orb orb-right"></div>

        <div className="page-wrap">
          <header className="topbar">
            <div>
              <div className="brand-en">
                Y<span>On</span>Lab
              </div>
              <div className="brand-ko">와이온랩(주)</div>
            </div>
            <div className="top-badge">Temporary Business Landing Page</div>
          </header>

          <section className="hero-grid">
            <div>
              <div className="pill">Trusted Intelligence, Verified On-Device</div>

              <h1 className="hero-title">
                Physical AI와 Device Validation을 연결하는
                <span>실행 중심 기술사업화 파트너</span>
              </h1>

              <p className="hero-copy">
                YOnLab은 온디바이스 AI, 디바이스 검증, 플랫폼화, 기술사업화를 연결하는 실행 중심 기업입니다.
                실디바이스 기반 검증과 협업 구조를 통해 고객과 파트너의 기술을 실제 사업과 제품으로 연결합니다.
              </p>

              <div className="hero-actions">
                <a className="btn btn-primary" href="mailto:yubi.lee@yonlab.ai">
                  사업 문의
                </a>
                <a
                  className="btn btn-secondary"
                  href="mailto:yubi.lee@yonlab.ai?subject=Company%20Profile%20Request"
                >
                  회사 소개 요청
                </a>
              </div>

              <div className="card-grid">
                {focusAreas.map((item) => (
                  <div key={item.title} className="info-card">
                    <div className="info-card-title">{item.title}</div>
                    <p>{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <aside className="snapshot-card">
              <div className="section-label">Company Snapshot</div>

              <div className="snapshot-list">
                <div>
                  <div className="snapshot-key">Company</div>
                  <div className="snapshot-value">와이온랩(주) / YOnLab Co., Ltd.</div>
                </div>

                <div>
                  <div className="snapshot-key">Representative</div>
                  <div className="snapshot-value">이근영 / Yubi Lee</div>
                </div>

                <div>
                  <div className="snapshot-key">Email</div>
                  <div className="snapshot-value">
                    <a href="mailto:yubi.lee@yonlab.ai">yubi.lee@yonlab.ai</a>
                  </div>
                </div>

                <div>
                  <div className="snapshot-key">Phone</div>
                  <div className="snapshot-value">+82-10-9010-2115</div>
                </div>

                <div>
                  <div className="snapshot-key">Address</div>
                  <div className="snapshot-value">
                    서울특별시 강남구 논현로134길 12, 310호 (우:06052)
                  </div>
                </div>
              </div>
            </aside>
          </section>

          <section className="bottom-grid">
            <div className="panel">
              <h2>Focus Areas</h2>
              <div className="tag-grid">
                {domains.map((item) => (
                  <div key={item} className="tag-item">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="panel">
              <h2>Collaboration Opportunities</h2>
              <p className="panel-copy">
                YOnLab은 AI, 반도체, 디바이스, 플랫폼, 실증, 기술사업화 영역의 다양한 파트너와 협업을 추진하고 있습니다.
                PoC, 검증, 공동 제안, 정부과제, 사업화 협업이 필요한 경우 문의해 주세요.
              </p>

              <div className="target-list">
                {collaborationTargets.map((item) => (
                  <div key={item} className="target-item">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </section>

          <footer className="site-footer">
            <div>© 2026 YOnLab Co., Ltd. All rights reserved.</div>
            <div>Business Development / Contact: yubi.lee@yonlab.ai</div>
          </footer>
        </div>
      </section>
    </main>
  )
}