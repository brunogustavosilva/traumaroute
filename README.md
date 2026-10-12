# Trauma Route

Protótipo mobile de navegação para equipes de emergência, feito com Expo, React Native e TypeScript.

## O que está no protótipo

- **Navegar:** busca e seleção entre cinco hospitais demonstrativos de Curitiba, mapa esquemático, estimativas ilustrativas e controles locais para iniciar a navegação, centralizar o mapa e silenciar o áudio.
- **Rotas:** seleção entre três alternativas demonstrativas.
- **Relatório:** avaliação por estrelas, categorias de ocorrência e observações locais.

Os destinos vêm de uma lista local; não há busca online nem geocodificação. O mapa, tempos, confiança e acessos são ilustrativos. O app não se conecta a GPS, trânsito, despacho, Waze ou Google Maps, e não autoriza circulação em faixas ou vias restritas.

## Rodar localmente

```bash
npm install
npx expo start
```

Abra o QR code com Expo Go para testar em um celular, ou execute `npm run web` para abrir a versão web. Para verificar os tipos, execute `npm run typecheck`.

## Gerar APK

O projeto usa EAS Build. Associe-o à sua conta Expo uma vez, o que grava o identificador do projeto na configuração:

```bash
npx eas-cli@latest init
```

Depois, gere um APK de distribuição interna:

```bash
npx eas-cli@latest build --platform android --profile production
```

O workflow manual em `.github/workflows/build-android.yml` gera e anexa o APK como artefato de uma execução. Antes de usá-lo:

1. Associe o projeto a uma conta Expo com `npx eas-cli@latest init` e envie a alteração de `app.json` ao GitHub.
2. Crie um token no Expo e cadastre-o nas configurações do repositório GitHub como secret `EXPO_TOKEN`.
3. No GitHub, abra **Actions → Build Android APK → Run workflow**. Ao terminar, baixe `trauma-route-android-apk` e instale o APK no Android.

O Android pode pedir autorização para instalar apps baixados pelo navegador. A assinatura desse APK é para distribuição interna, não para publicação na Play Store.

## Próxima etapa de produto

Antes de qualquer uso operacional, substituir o mapa esquemático por mapas e dados validados, integrar posicionamento e roteamento, e revisar acessos, protocolos e segurança com as autoridades e equipes responsáveis.