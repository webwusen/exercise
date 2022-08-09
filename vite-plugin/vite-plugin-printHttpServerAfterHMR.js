export default function printHttpServer() {
  return {
    name: 'print-http-server',
    handleHotUpdate({ modules, server }) {
      // 热更后重新打印程序服务地址
      // 启动多个项目，多次热更后，被会被热更信息覆盖导致难以查找
      if (modules.length && server.printUrls) {
        setTimeout(() => {
          server.printUrls()
        }, 16)
      }
    }
  }
}
