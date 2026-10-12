import { Crosshair, MapPin, Navigation2, Pause, Play, Search, ShieldAlert, Volume2 } from 'lucide-react-native';
import { useState } from 'react';
import { Keyboard, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import Svg, { Circle, Path, Polygon, Rect } from 'react-native-svg';

const colors = {
  background: '#090E12',
  panel: '#111A20',
  line: '#25323A',
  muted: '#82939C',
  text: '#F1F6F7',
  cyan: '#37E6D0',
  red: '#FF4B55',
  green: '#7BE0A2',
};

const demoDestinations = [
  { name: 'Hospital Universitário Cajuru', area: 'Cristo Rei', address: 'Av. São José, 300', eta: '08', distance: '3,2 km', arrival: '14:32', turn: 'Continue pela Av. Sete de Setembro', turnDistance: 'VIRE À DIREITA EM 450 m' },
  { name: 'Hospital do Trabalhador', area: 'Novo Mundo', address: 'Av. República Argentina, 4406', eta: '12', distance: '6,8 km', arrival: '14:36', turn: 'Acesso pela Av. República Argentina', turnDistance: 'ENTRADA PRINCIPAL · DEMO' },
  { name: 'Hospital de Clínicas UFPR', area: 'Alto da Glória', address: 'Rua General Carneiro, 181', eta: '10', distance: '4,4 km', arrival: '14:34', turn: 'Siga pela Rua General Carneiro', turnDistance: 'VIRE À ESQUERDA EM 300 m' },
  { name: 'Hospital Evangélico Mackenzie', area: 'Bigorrilho', address: 'Alameda Augusto Stellfeld, 1908', eta: '09', distance: '3,7 km', arrival: '14:33', turn: 'Acesso pela Alameda Augusto Stellfeld', turnDistance: 'ENTRADA PRINCIPAL · DEMO' },
  { name: 'Hospital Municipal do Idoso', area: 'Pinheirinho', address: 'Rua Lothário Boutin, 90', eta: '18', distance: '9,1 km', arrival: '14:42', turn: 'Acesso pela Rua Lothário Boutin', turnDistance: 'ENTRADA PRINCIPAL · DEMO' },
];

function CityMap({ centered, destinationArea, onRecenter }: { centered: boolean; destinationArea: string; onRecenter: () => void }) {
  return (
    <View style={styles.map}>
      <Svg viewBox="0 0 390 520" preserveAspectRatio="xMidYMid slice" style={StyleSheet.absoluteFill}>
        <Rect width="390" height="520" fill="#DDE5E8" />
        <Path d="M0 104H390M0 244H390M0 392H390M88 0V520M238 0V520M354 0V520" stroke="#BECAD0" strokeWidth="27" />
        <Path d="M0 104H390M0 244H390M0 392H390M88 0V520M238 0V520M354 0V520" stroke="#F9FBFC" strokeWidth="21" />
        <Path d="M0 174H390M0 318H390M0 464H390M163 0V520M302 0V520" stroke="#C8D2D7" strokeWidth="15" />
        <Path d="M0 174H390M0 318H390M0 464H390M163 0V520M302 0V520" stroke="#F7F9FA" strokeWidth="11" />
        <Rect x="13" y="16" width="61" height="72" rx="3" fill="#C3CFD5" />
        <Rect x="15" y="14" width="57" height="67" rx="2" fill="#F3F6F7" />
        <Rect x="104" y="16" width="48" height="72" rx="3" fill="#BFCBD1" />
        <Rect x="105" y="14" width="44" height="67" rx="2" fill="#F1F5F6" />
        <Rect x="253" y="14" width="89" height="75" rx="3" fill="#B9C7CE" />
        <Rect x="254" y="12" width="84" height="69" rx="2" fill="#F2F5F6" />
        <Rect x="15" y="115" width="57" height="50" rx="3" fill="#BDC9CF" />
        <Rect x="16" y="113" width="53" height="46" rx="2" fill="#F3F6F7" />
        <Rect x="176" y="114" width="56" height="52" rx="3" fill="#BFCBD1" />
        <Rect x="178" y="112" width="52" height="48" rx="2" fill="#EEF3F5" />
        <Rect x="311" y="115" width="65" height="48" rx="3" fill="#BDC9CF" />
        <Rect x="312" y="113" width="60" height="44" rx="2" fill="#F3F6F7" />
        <Rect x="101" y="256" width="52" height="54" rx="3" fill="#BAC7CE" />
        <Rect x="102" y="254" width="48" height="50" rx="2" fill="#F2F5F6" />
        <Rect x="253" y="255" width="88" height="55" rx="3" fill="#B8C6CD" />
        <Rect x="254" y="253" width="83" height="50" rx="2" fill="#F0F4F5" />
        <Rect x="16" y="330" width="58" height="54" rx="3" fill="#BECAD0" />
        <Rect x="17" y="328" width="53" height="49" rx="2" fill="#F1F5F6" />
        <Rect x="176" y="330" width="55" height="55" rx="3" fill="#BFCBD1" />
        <Rect x="178" y="328" width="51" height="51" rx="2" fill="#F4F6F7" />
        <Rect x="311" y="330" width="65" height="54" rx="3" fill="#BFCBD1" />
        <Rect x="312" y="328" width="60" height="50" rx="2" fill="#F1F5F6" />
        <Path d="M192 500V351Q192 335 208 335H276Q298 335 298 313V252Q298 235 315 235H390" fill="none" stroke="#153F4A" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M192 500V351Q192 335 208 335H276Q298 335 298 313V252Q298 235 315 235H390" fill="none" stroke="#10CDBA" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M192 500V351Q192 335 208 335H276Q298 335 298 313V252Q298 235 315 235H390" fill="none" stroke="#F2FFFF" strokeWidth="2" strokeDasharray="3 10" strokeLinecap="round" />
        <Circle cx="192" cy={centered ? 466 : 444} r="29" fill="#37E6D0" opacity="0.2" />
        <Circle cx="192" cy={centered ? 466 : 444} r="17" fill="#0DAFAD" stroke="#F7FFFF" strokeWidth="3" />
        <Polygon points={centered ? '192,451 184,474 192,469 200,474' : '192,429 184,452 192,447 200,452'} fill="#FFFFFF" />
        <Circle cx="298" cy="313" r="6" fill="#FF4B55" stroke="#FFFFFF" strokeWidth="3" />
      </Svg>
      <View style={styles.mapTopLeft}>
        <Text style={styles.mapTag}>CURITIBA · {destinationArea.toUpperCase()}</Text>
        <Text style={styles.mapSubtag}>MAPA ESQUEMÁTICO</Text>
      </View>
      <View style={styles.mapTopRight}>
        <View style={styles.liveDot} />
        <Text style={styles.liveText}>DEMO</Text>
      </View>
      <Pressable accessibilityLabel="Centralizar mapa" onPress={onRecenter} style={styles.centerMap}>
        <Crosshair color="#102027" size={20} />
      </Pressable>
      <View style={styles.mapLegend}>
        <View style={styles.legendLine} />
        <Text style={styles.legendText}>ROTA SUGERIDA</Text>
      </View>
    </View>
  );
}

export default function NavigationScreen() {
  const [active, setActive] = useState(false);
  const [destination, setDestination] = useState(demoDestinations[0]);
  const [destinationQuery, setDestinationQuery] = useState('');
  const [destinationPickerOpen, setDestinationPickerOpen] = useState(false);
  const [centered, setCentered] = useState(true);
  const [muted, setMuted] = useState(false);
  const filteredDestinations = demoDestinations.filter((place) =>
    `${place.name} ${place.area} ${place.address}`.toLocaleLowerCase('pt-BR').includes(destinationQuery.trim().toLocaleLowerCase('pt-BR')),
  );

  const selectDestination = (place: (typeof demoDestinations)[number]) => {
    setDestination(place);
    setDestinationQuery('');
    setDestinationPickerOpen(false);
    Keyboard.dismiss();
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <View style={styles.header}>
        <View>
          <Text style={styles.wordmark}>TRAUMA<Text style={styles.wordmarkAccent}>ROUTE</Text></Text>
          <Text style={styles.headerCaption}>NAVEGAÇÃO DE EMERGÊNCIA</Text>
        </View>
        <View style={styles.unitBadge}><View style={styles.unitDot} /><Text style={styles.unitText}>UNIDADE 07</Text></View>
      </View>

      <View style={styles.modeRow}>
        <View style={styles.modeIcon}><Navigation2 color={colors.cyan} size={16} /></View>
        <Text style={styles.modeLabel}>{active ? 'NAVEGAÇÃO ATIVA' : 'PRÉ-ROTA'}</Text>
        <Text style={styles.modeDivider}>/</Text>
        <Text style={styles.modeNote}>DADOS ILUSTRATIVOS</Text>
      </View>

      <View style={styles.destinationPanel}>
        <View style={styles.destinationMarker}><View style={styles.destinationMarkerInner} /></View>
        <View style={styles.destinationInputWrap}>
          <Text style={styles.fieldLabel}>DESTINO</Text>
          <TextInput
            accessibilityLabel="Destino"
            value={destinationPickerOpen ? destinationQuery : destination.name}
            onFocus={() => {
              setDestinationQuery('');
              setDestinationPickerOpen(true);
            }}
            onChangeText={(value) => setDestinationQuery(value)}
            onSubmitEditing={() => {
              const exactMatch = filteredDestinations.find((place) => place.name.toLocaleLowerCase('pt-BR') === destinationQuery.trim().toLocaleLowerCase('pt-BR'));
              if (exactMatch) selectDestination(exactMatch);
              else Keyboard.dismiss();
            }}
            style={styles.destinationInput}
            placeholder="Buscar hospital ou bairro"
            placeholderTextColor="#81919A"
            returnKeyType="search"
          />
        </View>
        <View style={styles.etaPill}><Text style={styles.etaValue}>{destination.eta}</Text><Text style={styles.etaUnit}>MIN</Text></View>
      </View>

      {destinationPickerOpen && (
        <View style={styles.destinationResults}>
          <View style={styles.resultsHeader}>
            <Search color={colors.muted} size={13} />
            <Text style={styles.resultsTitle}>{destinationQuery ? 'RESULTADOS' : 'DESTINOS DEMONSTRATIVOS'}</Text>
            <Text style={styles.resultsCount}>{filteredDestinations.length}</Text>
          </View>
          {filteredDestinations.length > 0 ? filteredDestinations.map((place) => (
            <Pressable key={place.name} accessibilityRole="button" onPress={() => selectDestination(place)} style={styles.destinationOption}>
              <MapPin color={place.name === destination.name ? colors.cyan : colors.muted} size={16} />
              <View style={styles.optionCopy}>
                <Text style={styles.optionName}>{place.name}</Text>
                <Text style={styles.optionAddress}>{place.address} · {place.area}</Text>
              </View>
              <Text style={styles.optionEta}>{place.eta} MIN</Text>
            </Pressable>
          )) : <Text style={styles.noResults}>Nenhum destino demonstrativo encontrado.</Text>}
        </View>
      )}

      <CityMap centered={centered} destinationArea={destination.area} onRecenter={() => setCentered(!centered)} />

      <View style={styles.routeSummary}>
        <View style={styles.summaryMain}>
          <View style={styles.etaHeadline}><Text style={styles.etaBig}>{destination.eta}</Text><Text style={styles.etaBigUnit}>min</Text><Text style={styles.etaSeparator}>·</Text><Text style={styles.distanceText}>{destination.distance}</Text></View>
          <Text style={styles.arrivalText}>CHEGADA ESTIMADA {destination.arrival} · DEMO</Text>
        </View>
        <View style={styles.confidenceBlock}><Text style={styles.confidenceValue}>92%</Text><Text style={styles.confidenceLabel}>CONFIANÇA*</Text></View>
      </View>

      <View style={styles.nextTurn}>
        <View style={styles.turnIcon}><Navigation2 color={colors.cyan} size={19} /></View>
        <View style={styles.turnCopy}><Text style={styles.turnTitle}>{destination.turn}</Text><Text style={styles.turnDistance}>{destination.turnDistance}</Text></View>
        <Pressable accessibilityLabel={muted ? 'Ativar áudio' : 'Silenciar áudio'} onPress={() => setMuted(!muted)} style={styles.audioButton}>
          <Volume2 color={muted ? colors.muted : colors.text} size={19} />
        </Pressable>
      </View>

      <View style={styles.cautionRow}>
        <ShieldAlert color={colors.red} size={15} />
        <Text style={styles.cautionText}>Prioridade não é autorização irrestrita. Siga os protocolos locais.</Text>
      </View>

      <Pressable accessibilityRole="button" onPress={() => setActive(!active)} style={[styles.startButton, active && styles.stopButton]}>
        {active ? <Pause color="#101518" size={18} fill="#101518" /> : <Play color="#101518" size={18} fill="#101518" />}
        <Text style={styles.startButtonText}>{active ? 'PAUSAR NAVEGAÇÃO' : 'INICIAR NAVEGAÇÃO'}</Text>
      </Pressable>
      <Text style={styles.disclaimer}>* ESTIMATIVA ILUSTRATIVA · SEM DADOS DE TRÁFEGO OU DESPACHO REAL</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: 18, paddingTop: 12, paddingBottom: 24, gap: 14 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', minHeight: 43 },
  wordmark: { color: colors.text, fontFamily: 'SpaceMono', fontSize: 18, fontWeight: '700', letterSpacing: 0 },
  wordmarkAccent: { color: colors.red },
  headerCaption: { color: colors.muted, fontFamily: 'SpaceMono', fontSize: 8, marginTop: 2 },
  unitBadge: { flexDirection: 'row', alignItems: 'center', gap: 7, borderWidth: 1, borderColor: colors.line, borderRadius: 4, paddingVertical: 7, paddingHorizontal: 9 },
  unitDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: colors.green },
  unitText: { color: '#C5D1D5', fontFamily: 'SpaceMono', fontSize: 9 },
  modeRow: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingTop: 2 },
  modeIcon: { width: 27, height: 27, borderRadius: 4, backgroundColor: '#12302F', alignItems: 'center', justifyContent: 'center' },
  modeLabel: { color: colors.cyan, fontFamily: 'SpaceMono', fontSize: 10, fontWeight: '700' },
  modeDivider: { color: '#516169', fontSize: 13 },
  modeNote: { color: colors.muted, fontFamily: 'SpaceMono', fontSize: 8 },
  destinationPanel: { minHeight: 68, flexDirection: 'row', alignItems: 'center', backgroundColor: colors.panel, borderColor: colors.line, borderWidth: 1, borderRadius: 6, paddingHorizontal: 13, gap: 12 },
  destinationMarker: { width: 17, height: 17, borderRadius: 9, borderColor: colors.red, borderWidth: 2, alignItems: 'center', justifyContent: 'center' },
  destinationMarkerInner: { width: 5, height: 5, borderRadius: 3, backgroundColor: colors.red },
  destinationInputWrap: { flex: 1, gap: 4 },
  fieldLabel: { color: colors.muted, fontFamily: 'SpaceMono', fontSize: 8 },
  destinationInput: { color: colors.text, fontSize: 14, padding: 0, minHeight: 20 },
  etaPill: { borderLeftColor: colors.line, borderLeftWidth: 1, paddingLeft: 12, alignItems: 'center' },
  etaValue: { color: colors.text, fontFamily: 'SpaceMono', fontSize: 16, fontWeight: '700' },
  etaUnit: { color: colors.muted, fontFamily: 'SpaceMono', fontSize: 8 },
  destinationResults: { marginTop: -9, backgroundColor: '#111A20', borderColor: colors.line, borderWidth: 1, borderRadius: 5, overflow: 'hidden' },
  resultsHeader: { minHeight: 34, flexDirection: 'row', alignItems: 'center', gap: 7, paddingHorizontal: 12, borderBottomColor: colors.line, borderBottomWidth: 1 },
  resultsTitle: { flex: 1, color: colors.muted, fontFamily: 'SpaceMono', fontSize: 8 },
  resultsCount: { color: colors.cyan, fontFamily: 'SpaceMono', fontSize: 8 },
  destinationOption: { minHeight: 55, flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 12, borderBottomColor: '#1D282E', borderBottomWidth: 1 },
  optionCopy: { flex: 1, gap: 4 },
  optionName: { color: colors.text, fontSize: 11, fontWeight: '600' },
  optionAddress: { color: colors.muted, fontSize: 9 },
  optionEta: { color: colors.cyan, fontFamily: 'SpaceMono', fontSize: 8 },
  noResults: { color: colors.muted, fontSize: 10, padding: 13 },
  map: { height: 360, borderRadius: 6, overflow: 'hidden', borderWidth: 1, borderColor: colors.line, backgroundColor: '#DDE5E8' },
  mapTopLeft: { position: 'absolute', top: 12, left: 12, backgroundColor: 'rgba(9,14,18,0.86)', paddingVertical: 7, paddingHorizontal: 9, borderRadius: 3 },
  mapTag: { color: '#F2F7F8', fontFamily: 'SpaceMono', fontSize: 8, fontWeight: '700' },
  mapSubtag: { color: '#A5B7BE', fontFamily: 'SpaceMono', fontSize: 7, marginTop: 3 },
  mapTopRight: { position: 'absolute', top: 12, right: 12, flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: 'rgba(9,14,18,0.86)', paddingVertical: 7, paddingHorizontal: 9, borderRadius: 3 },
  liveDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.red },
  liveText: { color: '#F2F7F8', fontFamily: 'SpaceMono', fontSize: 8, fontWeight: '700' },
  centerMap: { position: 'absolute', right: 12, bottom: 49, width: 40, height: 40, borderRadius: 4, backgroundColor: '#F7FAFB', alignItems: 'center', justifyContent: 'center', elevation: 3 },
  mapLegend: { position: 'absolute', left: 12, bottom: 12, flexDirection: 'row', alignItems: 'center', gap: 7, backgroundColor: 'rgba(9,14,18,0.86)', paddingVertical: 8, paddingHorizontal: 9, borderRadius: 3 },
  legendLine: { width: 19, height: 3, backgroundColor: '#10CDBA', borderRadius: 2 },
  legendText: { color: '#F2F7F8', fontFamily: 'SpaceMono', fontSize: 7 },
  routeSummary: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 3 },
  summaryMain: { gap: 1 },
  etaHeadline: { flexDirection: 'row', alignItems: 'baseline', gap: 5 },
  etaBig: { color: colors.text, fontFamily: 'SpaceMono', fontSize: 31, fontWeight: '700', lineHeight: 36 },
  etaBigUnit: { color: colors.text, fontSize: 15, fontWeight: '600' },
  etaSeparator: { color: colors.muted, fontSize: 15, marginHorizontal: 2 },
  distanceText: { color: '#C0CDD1', fontFamily: 'SpaceMono', fontSize: 11 },
  arrivalText: { color: colors.muted, fontFamily: 'SpaceMono', fontSize: 8 },
  confidenceBlock: { alignItems: 'flex-end', borderLeftWidth: 1, borderLeftColor: colors.line, paddingLeft: 14 },
  confidenceValue: { color: colors.green, fontFamily: 'SpaceMono', fontSize: 18, fontWeight: '700' },
  confidenceLabel: { color: colors.muted, fontFamily: 'SpaceMono', fontSize: 7, marginTop: 3 },
  nextTurn: { flexDirection: 'row', alignItems: 'center', gap: 11, borderTopColor: colors.line, borderTopWidth: 1, paddingTop: 13 },
  turnIcon: { width: 36, height: 36, backgroundColor: '#12302F', borderRadius: 4, alignItems: 'center', justifyContent: 'center' },
  turnCopy: { flex: 1, gap: 4 },
  turnTitle: { color: colors.text, fontSize: 12, fontWeight: '600' },
  turnDistance: { color: colors.cyan, fontFamily: 'SpaceMono', fontSize: 8 },
  audioButton: { width: 38, height: 38, borderRadius: 4, borderColor: colors.line, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  cautionRow: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#241619', borderLeftWidth: 2, borderLeftColor: colors.red, padding: 10 },
  cautionText: { flex: 1, color: '#D8B8BB', fontSize: 10, lineHeight: 15 },
  startButton: { minHeight: 49, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, borderRadius: 4, backgroundColor: colors.cyan },
  stopButton: { backgroundColor: '#FF7279' },
  startButtonText: { color: '#081213', fontFamily: 'SpaceMono', fontSize: 11, fontWeight: '700' },
  disclaimer: { color: '#71828A', fontFamily: 'SpaceMono', fontSize: 7, lineHeight: 12, textAlign: 'center' },
});
