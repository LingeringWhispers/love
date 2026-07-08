@echo off
chcp 65001 >nul
echo ========================================
echo 💖 爱心表白页面服务器启动中...
echo ========================================
echo.
echo 正在获取本机IP地址...
for /f "tokens=14" %%i in ('ipconfig ^| findstr /i "ipv4"') do (
    set IP=%%i
    goto :found
)
:found
echo.
echo ========================================
echo 📱 手机访问地址: http://%IP%:8000
echo ========================================
echo.
echo 💡 提示:
echo    1. 确保手机和电脑连接同一个Wi-Fi
echo    2. 在手机浏览器中输入上面的地址
echo    3. 按 Ctrl+C 可以停止服务器
echo.
echo ========================================
echo.
python -m http.server 8000
pause
