import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'homepage',
    redirectTo: 'homepage/feed',
    pathMatch: 'full',
  },
  {
    path: 'pref-notif',
    redirectTo: 'homepage/pref-notif',
    pathMatch: 'full',
  },
  {
    path: 'feed',
    redirectTo: 'homepage/feed',
    pathMatch: 'full',
  },
  {
    path: 'privacidade',
    redirectTo: 'homepage/privacidade',
    pathMatch: 'full',
  },
  {
    path: 'perfil-usuario',
    redirectTo: 'homepage/perfil-usuario',
    pathMatch: 'full',
  },
  {
    path: 'perfil-outro-usuario',
    redirectTo: 'homepage/perfil-outro-usuario',
    pathMatch: 'full',
  },
  {
    path: 'app-post',
    redirectTo: 'homepage/app-post',
    pathMatch: 'full',
  },
  {
    path: 'canal-saude',
    redirectTo: 'homepage/canal-saude',
    pathMatch: 'full',
  },
  {
    path: 'chaveamento',
    redirectTo: 'homepage/chaveamento',
    pathMatch: 'full',
  },
  {
    path: 'resultados',
    redirectTo: 'homepage/resultados',
    pathMatch: 'full',
  },
  {
    path: 'estatisticas',
    redirectTo: 'homepage/estatisticas',
    pathMatch: 'full',
  },
  {
    path: 'avaliar-jogador',
    redirectTo: 'homepage/avaliar-jogador',
    pathMatch: 'full',
  },
  {
    path: 'cadastro',
    loadComponent: () =>
      import('./auth/cadastro/cadastro.page').then((m) => m.CadastroPage),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'homepage',
    loadComponent: () =>
      import('./pages/homepage/homepage.page').then((m) => m.HomepagePage),
    canActivate:[AuthGuard],
    children: [
      {
        path: 'feed',
        loadComponent: () =>
          import('./pages/feed/feed.page').then((m) => m.FeedPage),
      },
      {
        path: 'modalidades',
        loadComponent: () =>
          import('./pages/modalidades/modalidades.page').then(
            (m) => m.ModalidadesPage
          ),
      },
      {
        path: 'campeonatos',
        loadComponent: () =>
          import('./pages/campeonatos/campeonatos.page').then(
            (m) => m.CampeonatosPage
          ),
      },
      {
        path: 'metas',
        loadComponent: () =>
          import('./pages/metas/metas.page').then((m) => m.MetasPage),
      },
      {
        path: 'pref-notif',
        loadComponent: () =>
          import('./pages/pref-notif/pref-notif.page').then(
            (m) => m.PrefNotifPage
          ),
      },
      {
        path: 'privacidade',
        loadComponent: () =>
          import('./pages/privacidade/privacidade.page').then(
            (m) => m.PrivacidadePage
          ),
      },
      {
        path: 'perfil-usuario',
        loadComponent: () =>
          import('./pages/perfil-usuario/perfil-usuario.page').then(
            (m) => m.PerfilUsuarioPage
          ),
      },
      {
        path: 'perfil-outro-usuario',
        loadComponent: () =>
          import('./pages/perfil-outro-usuario/perfil-outro-usuario.page').then(
            (m) => m.PerfilOutroUsuarioPage
          ),
      },
      {
        path: 'app-post',
        loadComponent: () =>
          import('./pages/post/post.page').then((m) => m.PostPage),
      },
      {
        path: 'canal-saude',
        loadComponent: () =>
          import('./pages/canal-saude/canal-saude.page').then(
            (m) => m.CanalSaudePage
          ),
      },
      {
        path: 'chaveamento',
        loadComponent: () =>
          import('./pages/chaveamento/chaveamento.page').then(
            (m) => m.ChaveamentoPage
          ),
      },
      {
        path: 'resultados',
        loadComponent: () =>
          import('./pages/resultados/resultados.page').then(
            (m) => m.ResultadosPage
          ),
      },
      {
        path: 'estatisticas',
        loadComponent: () =>
          import('./pages/estatisticas/estatisticas.page').then(
            (m) => m.EstatisticasPage
          ),
      },
      {
        path: 'avaliar-jogador',
        loadComponent: () =>
          import('./pages/avaliar-jogador/avaliar-jogador.page').then(
            (m) => m.AvaliarJogadorPage
          ),
      },
    ],
  },
];
