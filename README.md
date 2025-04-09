# THREAD 

## App khởi động
    ↓
## Hiện WelcomeScreen 2 giây
    ↓
    Nếu chưa đăng nhập (isLoggedIn = false):
    → AuthNavigator
        ↓
        LoginScreen
            ↓
            Khi bấm “Đăng nhập” → setIsLoggedIn(true)
    ↓
## isLoggedIn = true → React re-render
    ↓
## Hiển thị HomeNavigator (Bottom Navigation)