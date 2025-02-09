import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">TempMail Pro</h1>
          <p className="text-gray-300 text-lg">Email sementara gratis untuk kebutuhan Anda</p>
        </div>
        
        <div className="max-w-3xl mx-auto bg-gray-800 rounded-lg shadow-xl p-6">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                className="flex-1 px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
                placeholder="your-email"
                readOnly
              />
              <span className="text-white">@tempmail.pro</span>
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
              >
                Copy
              </Button>
              <Button
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
              >
                Refresh
              </Button>
            </div>
            
            <div className="bg-gray-700 rounded-lg p-4 min-h-[400px]">
              <div className="text-gray-300 text-center">
                <p>Belum ada email yang diterima</p>
                <p className="text-sm">Email yang masuk akan muncul di sini secara otomatis</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-gray-400">
          <p>© 2024 TempMail Pro. Semua hak cipta dilindungi.</p>
        </div>
      </div>
    </main>
  )
}
