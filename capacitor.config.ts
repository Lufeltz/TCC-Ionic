import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'TCC2',
  webDir: 'www',
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,  // tempo (em milissegundos) que a splash screen fica visível
      launchAutoHide: true,  // se a splash screen deve ser ocultada automaticamente após o tempo configurado
      backgroundColor: '#ffffff',  // cor de fundo da splash screen
      androidSplashResourceName: 'splash',  // nome do recurso de imagem no Android
      iosSplashResourceName: 'splash',  // nome do recurso de imagem no iOS
      showSpinner: true,  // exibe um spinner (carregamento) na splash screen
      spinnerStyle: 'horizontal',  // tipo do spinner
    },
  },
};

export default config;
