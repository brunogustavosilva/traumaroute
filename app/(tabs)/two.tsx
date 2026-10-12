import { ArrowRight, Check, Clock3, Route, ShieldCheck, Zap } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

const palette = { bg: '#090E12', panel: '#111A20', border: '#25323A', text: '#F1F6F7', muted: '#82939C', cyan: '#37E6D0', red: '#FF4B55', green: '#7BE0A2' };

const routes = [
  { id: 'trauma', name: 'Trauma Route', label: 'SUGERIDA · DEMO', eta: '08', distance: '3,2 km', confidence: '92%', color: palette.cyan, detail: 'Via expressa · 2 conversões' },
  { id: 'regular', name: 'Rota convencional', label: 'ALTERNATIVA · DEMO', eta: '11', distance: '4,1 km', confidence: '—', color: '#AAB7BE', detail: 'Vias urbanas · 5 conversões' },
  { id: 'alternate', name: 'Via rápida', label: 'ALTERNATIVA · DEMO', eta: '10', distance: '3,8 km', confidence: '78%', color: '#F4BA5D', detail: 'Acesso controlado · 3 conversões' },
];

export default function RoutesScreen() {
  const [selected, setSelected] = useState('trauma');
  const [confirmed, setConfirmed] = useState(false);
  const chosen = routes.find((route) => route.id === selected) ?? routes[0];

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.kicker}>CENTRAL DE ROTAS <Text style={styles.kickerAccent}>/ 01</Text></Text>
        <Text style={styles.title}>Compare caminhos.</Text>
        <Text style={styles.subtitle}>Estimativas demonstrativas para Curitiba · destino: H.U. Cajuru</Text>
      </View>

      <View style={styles.notice}>
        <ShieldCheck color={palette.cyan} size={17} />
        <Text style={styles.noticeText}>Nenhum serviço de tráfego ou despacho está conectado.</Text>
      </View>

      <View style={styles.sectionHead}>
        <Text style={styles.sectionTitle}>OPÇÕES DISPONÍVEIS</Text>
        <Text style={styles.sectionMeta}>3 ROTAS · SIMULAÇÃO</Text>
      </View>

      {routes.map((route) => {
        const isSelected = selected === route.id;
        return (
          <Pressable key={route.id} accessibilityRole="radio" accessibilityState={{ selected: isSelected }} onPress={() => { setSelected(route.id); setConfirmed(false); }} style={[styles.routeCard, isSelected && styles.routeCardSelected]}>
            <View style={styles.cardTop}>
              <View style={[styles.routeIcon, { borderColor: route.color }]}><Route color={route.color} size={17} /></View>
              <View style={styles.routeHeading}>
                <Text style={styles.routeName}>{route.name}</Text>
                <Text style={[styles.routeLabel, { color: route.color }]}>{route.label}</Text>
              </View>
              <View style={[styles.radio, isSelected && { borderColor: route.color }]}>{isSelected && <View style={[styles.radioInner, { backgroundColor: route.color }]} />}</View>
            </View>
            <View style={styles.routeStats}>
              <View style={styles.etaStat}><Clock3 color={palette.muted} size={15} /><Text style={styles.etaNum}>{route.eta}</Text><Text style={styles.etaMin}>min</Text></View>
              <View style={styles.statDivider} />
              <Text style={styles.distance}>{route.distance}</Text>
              <View style={styles.statSpacer} />
              {route.id === 'trauma' ? <View style={styles.confidence}><Zap color={palette.green} size={12} /><Text style={styles.confidenceText}>{route.confidence}</Text></View> : <Text style={styles.confidencePlaceholder}>{route.confidence}</Text>}
            </View>
            <View style={styles.cardFooter}><Text style={styles.routeDetail}>{route.detail}</Text>{isSelected && <Text style={styles.selectedLabel}>SELECIONADA</Text>}</View>
          </Pressable>
        );
      })}

      <View style={styles.comparison}>
        <Text style={styles.sectionTitle}>DIFERENÇA ESTIMADA</Text>
        <View style={styles.comparisonRow}>
          <View><Text style={styles.comparisonNumber}>{chosen.eta} min</Text><Text style={styles.comparisonCaption}>TEMPO ESTIMADO</Text></View>
          <ArrowRight color={palette.muted} size={19} />
          <View style={styles.comparisonRight}><Text style={styles.comparisonNumber}>{chosen.distance}</Text><Text style={styles.comparisonCaption}>DISTÂNCIA</Text></View>
        </View>
      </View>

      <Pressable accessibilityRole="button" onPress={() => setConfirmed(true)} style={styles.selectButton}>
        {confirmed ? <Check color="#081213" size={18} /> : <ArrowRight color="#081213" size={18} />}
        <Text style={styles.selectButtonText}>{confirmed ? 'ROTA DEFINIDA NESTA DEMO' : 'DEFINIR ROTA SELECIONADA'}</Text>
      </Pressable>
      <Text style={styles.disclaimer}>TEMPOS, CONFIANÇA E ACESSOS SÃO DADOS ILUSTRATIVOS, NÃO OPERACIONAIS.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: palette.bg },
  content: { padding: 20, paddingTop: 18, paddingBottom: 28, gap: 16 },
  header: { gap: 7 },
  kicker: { color: palette.muted, fontFamily: 'SpaceMono', fontSize: 9 },
  kickerAccent: { color: palette.red },
  title: { color: palette.text, fontSize: 25, fontWeight: '700', letterSpacing: 0 },
  subtitle: { color: palette.muted, fontSize: 12, lineHeight: 18 },
  notice: { flexDirection: 'row', alignItems: 'center', gap: 9, padding: 11, backgroundColor: '#10211F', borderWidth: 1, borderColor: '#23443F', borderRadius: 5 },
  noticeText: { flex: 1, color: '#B8D7D2', fontSize: 10, lineHeight: 15 },
  sectionHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 5 },
  sectionTitle: { color: '#BCC9CD', fontFamily: 'SpaceMono', fontSize: 9, fontWeight: '700' },
  sectionMeta: { color: palette.muted, fontFamily: 'SpaceMono', fontSize: 7 },
  routeCard: { backgroundColor: palette.panel, borderWidth: 1, borderColor: palette.border, borderRadius: 6, padding: 14, gap: 12 },
  routeCardSelected: { borderColor: palette.cyan, backgroundColor: '#101E21' },
  cardTop: { flexDirection: 'row', alignItems: 'center', gap: 11 },
  routeIcon: { width: 34, height: 34, borderWidth: 1, borderRadius: 4, alignItems: 'center', justifyContent: 'center' },
  routeHeading: { flex: 1, gap: 4 },
  routeName: { color: palette.text, fontSize: 14, fontWeight: '600' },
  routeLabel: { fontFamily: 'SpaceMono', fontSize: 7 },
  radio: { width: 18, height: 18, borderRadius: 9, borderWidth: 1, borderColor: '#58666C', alignItems: 'center', justifyContent: 'center' },
  radioInner: { width: 8, height: 8, borderRadius: 4 },
  routeStats: { flexDirection: 'row', alignItems: 'center', gap: 9, paddingVertical: 10, borderTopColor: palette.border, borderTopWidth: 1, borderBottomColor: palette.border, borderBottomWidth: 1 },
  etaStat: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  etaNum: { color: palette.text, fontFamily: 'SpaceMono', fontSize: 19, fontWeight: '700' },
  etaMin: { color: palette.muted, fontSize: 10 },
  statDivider: { height: 19, width: 1, backgroundColor: palette.border, marginHorizontal: 3 },
  distance: { color: '#C3CED2', fontFamily: 'SpaceMono', fontSize: 10 },
  statSpacer: { flex: 1 },
  confidence: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  confidenceText: { color: palette.green, fontFamily: 'SpaceMono', fontSize: 10 },
  confidencePlaceholder: { color: palette.muted, fontFamily: 'SpaceMono', fontSize: 10 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  routeDetail: { color: palette.muted, fontSize: 10 },
  selectedLabel: { color: palette.cyan, fontFamily: 'SpaceMono', fontSize: 7 },
  comparison: { backgroundColor: '#11171C', borderRadius: 5, padding: 14, gap: 13, borderLeftColor: palette.red, borderLeftWidth: 2 },
  comparisonRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  comparisonRight: { alignItems: 'flex-end' },
  comparisonNumber: { color: palette.text, fontFamily: 'SpaceMono', fontSize: 17, fontWeight: '700' },
  comparisonCaption: { color: palette.muted, fontFamily: 'SpaceMono', fontSize: 7, marginTop: 3 },
  selectButton: { minHeight: 49, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 9, backgroundColor: palette.cyan, borderRadius: 4 },
  selectButtonText: { color: '#081213', fontFamily: 'SpaceMono', fontSize: 9, fontWeight: '700' },
  disclaimer: { color: '#71828A', fontFamily: 'SpaceMono', fontSize: 7, lineHeight: 12, textAlign: 'center' },
});
