import { useState, useEffect } from "react"

export default function App() {
  // 模拟数据：提示词列表
  const mockPrompts = [
    {
      id: 1,
      title: "AI 写作助手",
      description: "帮助用户生成高质量文章内容的通用写作提示词",
      price: 9.99,
      tags: ["写作", "内容创作"],
      author: "PromptMaster",
    },
    {
      id: 2,
      title: "SEO 关键词优化",
      description: "为搜索引擎优化内容的关键词分析和建议提示词",
      price: 14.99,
      tags: ["SEO", "优化"],
      author: "SearchGuru",
    },
    {
      id: 3,
      title: "创意头脑风暴",
      description: "激发灵感，适用于产品设计、营销策划等场景",
      price: 7.99,
      tags: ["创意", "头脑风暴"],
      author: "Innovator",
    },
    {
      id: 4,
      title: "编程代码解释器",
      description: "将自然语言描述转化为具体代码逻辑和示例",
      price: 19.99,
      tags: ["编程", "代码解释"],
      author: "CodeHelper",
    },
  ]

  const [cart, setCart] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [contactModalOpen, setContactModalOpen] = useState(false)
  const [demandModalOpen, setDemandModalOpen] = useState(false)
  const [selectedPrompt, setSelectedPrompt] = useState(null)
  const [isDarkMode, setIsDarkMode] = useState(false)

  // 切换暗色模式
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDarkMode])

  // 添加到购物车
  const addToCart = (prompt) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === prompt.id)
      if (existing) return prev
      return [...prev, { ...prompt }]
    })
  }

  // 移除购物车中的项
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id))
  }

  // 打开购买模态框
  const openModal = (prompt) => {
    setSelectedPrompt(prompt)
    setModalOpen(true)
  }

  // 关闭模态框
  const closeModal = () => {
    setModalOpen(false)
    setSelectedPrompt(null)
  }

  // 打开联系模态框（成为创作者）
  const openContactModal = () => {
    setContactModalOpen(true)
  }

  // 关闭联系模态框
  const closeContactModal = () => {
    setContactModalOpen(false)
  }

  // 打开发布需求模态框
  const openDemandModal = () => {
    setDemandModalOpen(true)
  }

  // 关闭发布需求模态框
  const closeDemandModal = () => {
    setDemandModalOpen(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 shadow-lg sticky top-0 z-50 border-b border-gray-700 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-300 to-purple-300 text-transparent bg-clip-text">提示宝PromptX</h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-full hover:bg-gray-700 transition"
              aria-label="切换主题"
            >
              {isDarkMode ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
            </button>
            <div className="relative">
              <button
                onClick={() => {}}
                className="p-2 relative rounded-full hover:bg-gray-700 transition"
                aria-label="查看购物车"
              >
                <ShoppingCartIcon className="w-5 h-5" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full animate-pulse">
                    {cart.length}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-20 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
            探索最佳 AI 提示词
          </h2>
          <p className="text-xl opacity-90 mb-8">
            释放无限创造力 在这里找到最适合你需求的 AI 提示词
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <button className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition transform hover:scale-105">
              开始浏览
            </button>
            <button
              onClick={openContactModal}
              className="px-6 py-3 bg-transparent border border-white text-white font-semibold rounded-lg hover:bg-white/10 transition"
            >
              成为创作者
            </button>
            <button
              onClick={openDemandModal}
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold rounded-lg shadow-lg hover:from-green-600 hover:to-teal-600 transition transform hover:scale-105"
            >
              发布需求
            </button>
          </div>
        </div>
      </section>

      {/* Prompt List Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">热门提示词</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockPrompts.map((prompt) => (
              <PromptCard key={prompt.id} prompt={prompt} onBuy={() => openModal(prompt)} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gradient-to-br from-gray-800 via-gray-900 to-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">为什么选择我们</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              title="高质量内容"
              description="所有提示词都经过严格审核 确保质量和实用性"
              icon={<CheckIcon />}
            />
            <FeatureCard
              title="快速获取灵感"
              description="即时访问各种领域的优质提示词 节省您的时间"
              icon={<LightbulbIcon />}
            />
            <FeatureCard
              title="创作者社区"
              description="加入活跃的创作者社区 分享经验 共同成长"
              icon={<CommunityIcon />}
            />
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-800 via-purple-900 to-pink-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">准备好提升你的 AI 体验了吗</h2>
          <p className="text-lg opacity-90 mb-8">加入我们的平台 发现更多专业级的提示词</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <button className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg shadow hover:bg-gray-100 transition transform hover:scale-105">
              开始探索
            </button>
            <button
              onClick={openContactModal}
              className="px-6 py-3 bg-transparent border border-white text-white font-semibold rounded-lg hover:bg-white/10 transition"
            >
              成为创作者
            </button>
            <button
              onClick={openDemandModal}
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold rounded-lg shadow hover:from-green-600 hover:to-teal-600 transition transform hover:scale-105"
            >
              发布需求
            </button>
          </div>
        </div>
      </section>

      {/* Products & Services Section */}
      <section className="py-16 bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">产品与服务</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            <FooterColumn title="产品" links={["市场", "资源中心", "创作者计划", "API服务"]} />
            <FooterColumn title="公司" links={["关于我们", "联系我们", "博客", "职位招聘"]} />
            <FooterColumn title="支持" links={["帮助中心", "文档", "隐私政策", "使用条款"]} />
            <div>
              <h3 className="font-bold text-lg mb-4">订阅更新</h3>
              <p className="text-sm text-gray-400 mb-4">
                获取最新提示词与行业动态
              </p>
              <form className="flex">
                <input
                  type="email"
                  placeholder="输入邮箱"
                  className="px-4 py-2 rounded-l-lg focus:outline-none flex-grow text-black"
                />
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 rounded-r-lg transition">
                  订阅
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 border-t border-gray-800">
        <div className="container mx-auto px-4 text-center">
          <p>© 2025 提示宝PromptX - 专注于AI 提示词市场</p>
        </div>
      </footer>

      {/* 购买确认 Modal */}
      {modalOpen && selectedPrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl p-6 max-w-md w-full shadow-2xl transform transition-all animate-fadeIn">
            <h3 className="text-2xl font-bold mb-4">{selectedPrompt.title}</h3>
            <p className="mb-4">{selectedPrompt.description}</p>
            <div className="mb-6">
              <p className="text-sm text-gray-400">价格 ${selectedPrompt.price.toFixed(2)}</p>
              <p className="text-sm text-gray-400">作者 {selectedPrompt.author}</p>
            </div>
            <div className="mb-6">
              <h4 className="font-semibold mb-2">付款说明</h4>
              <ol className="list-decimal list-inside space-y-1 text-sm text-gray-300">
                <li>点击下方二维码进行扫码支付</li>
                <li>请在备注中填写您的邮箱地址</li>
                <li>支付完成后我们将在1个工作日内发送提示词</li>
              </ol>
            </div>
            <div className="flex justify-center mb-6">
              <img
                src="https://placehold.co/200x200?text=收款码"
                alt="收款码"
                className="w-40 h-40 object-cover rounded-lg shadow-md border border-gray-600"
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={closeModal}
                className="px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-700 transition"
              >
                取消
              </button>
              <button
                onClick={() => {
                  addToCart(selectedPrompt)
                  closeModal()
                  alert("已加入购物车")
                }}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition"
              >
                确认购买
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 发布需求 Modal */}
      {demandModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl p-6 max-w-sm w-full shadow-2xl">
            <h3 className="text-xl font-bold mb-4">发布需求</h3>
            <p className="mb-6">请将需求发送至 <strong>support@promptx.com</strong></p>
            <div className="text-right">
              <button
                onClick={closeDemandModal}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition"
              >
                确定
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 联系模态框 */}
      {contactModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl p-6 max-w-sm w-full shadow-2xl">
            <h3 className="text-xl font-bold mb-4">联系我们</h3>
            <p className="mb-6">如果你想成为创作者 请联系 <br /><strong>support@promptx.com</strong></p>
            <div className="text-right">
              <button
                onClick={closeContactModal}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition"
              >
                确定
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Feature Card Component
function FeatureCard({ title, description, icon }) {
  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-md text-center hover:shadow-xl transition-shadow duration-300">
      <div className="text-indigo-400 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  )
}

// Footer Column Component
function FooterColumn({ title, links }) {
  return (
    <div>
      <h3 className="font-bold text-lg mb-4">{title}</h3>
      <ul className="space-y-2 text-gray-400">
        {links.map((link, index) => (
          <li key={index}>
            <a href="#" className="hover:text-indigo-400 transition"> 
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

// 提示词卡片组件
function PromptCard({ prompt, onBuy }) {
  return (
    <div className="bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="p-5">
        <h3 className="text-xl font-semibold mb-2">{prompt.title}</h3>
        <p className="text-gray-300 text-sm mb-4 line-clamp-2">{prompt.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {prompt.tags.map((tag, index) => (
            <span
              key={index}
              className="text-xs px-2 py-1 bg-indigo-900 text-indigo-300 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex justify-between items-center">
          <span className="font-bold text-indigo-400">${prompt.price.toFixed(2)}</span>
          <button
            onClick={onBuy}
            className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition"
          >
            购买
          </button>
        </div>
      </div>
    </div>
  )
}

// Icons
function CheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  )
}

function LightbulbIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
    </svg>
  )
}

function CommunityIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0V8M7 20H2v-2a3 3 0 115.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857M7 20v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 115.356-1.857M15 7a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  )
}

// SVG Icons
function ShoppingCartIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={className}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
      />
    </svg>
  )
}

function MoonIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={className}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
      />
    </svg>
  )
}

function SunIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={className}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
  )
}

function TrashIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={className}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1H4a1 1 0 00-1 1v3M4 7h16"
      />
    </svg>
  )
}