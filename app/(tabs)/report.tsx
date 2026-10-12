import { Check, ChevronRight, CircleHelp, Star } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

const palette = { bg: '#090E12', panel: '#111A20', border: '#25323A', text: '#F1F6F7', muted: '#82939C', cyan: '#37E6D0', red: '#FF4B55', amber: '#F4BA5D' };
const tags = ['Rota adequada', 'Trecho bloqueado', 'Acesso incorreto', 'Trânsito diferente', 'Outro'];

export default function ReportScreen() {
  const [rating, setRating] = useState(0);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const toggleTag = (tag: string) => {
    setSubmitted(false);
    setSelectedTags((current) => current.includes(tag) ? current.filter((item) => item !== tag) : [...current, tag]);
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <View style={styles.header}>
        <Text style={styles.kicker}>PÓS-OCORRÊNCIA <Text style={styles.kickerAccent}>/ 02</Text></Text>
        <Text style={styles.title}>Como foi o trajeto?</Text>
        <Text style={styles.subtitle}>Seu relato ajuda a revisar a qualidade das rotas.</Text>
      </View>

      <View style={styles.tripCard}>
        <View style={styles.tripIcon}><CircleHelp color={palette.cyan} size={18} /></View>
        <View style={styles.tripCopy}><Text style={styles.tripTitle}>Registro de demonstração</Text><Text style={styles.tripSub}>TRAJETO #TR-0042 · CURITIBA</Text></View>
        <Text style={styles.tripTime}>14:24</Text>
      </View>

      {submitted ? (
        <View style={styles.successPanel}>
          <View style={styles.successIcon}><Check color="#081213" size={21} /></View>
          <Text style={styles.successTitle}>Relato registrado</Text>
          <Text style={styles.successText}>Salvo apenas nesta demonstração. Nenhum dado foi enviado.</Text>
          <Pressable onPress={() => setSubmitted(false)} style={styles.editButton}><Text style={styles.editButtonText}>EDITAR RELATO</Text><ChevronRight color={palette.cyan} size={15} /></Pressable>
        </View>
      ) : (
        <>
          <View style={styles.ratingPanel}>
            <Text style={styles.question}>A rota correspondeu à realidade?</Text>
            <Text style={styles.hint}>Avalie de 1 a 5</Text>
            <View style={styles.stars}>
              {[1, 2, 3, 4, 5].map((value) => (
                <Pressable key={value} accessibilityRole="button" accessibilityLabel={`${value} de 5 estrelas`} onPress={() => setRating(value)} style={styles.starButton}>
                  <Star color={value <= rating ? palette.amber : '#536168'} fill={value <= rating ? palette.amber : 'transparent'} size={30} />
                </Pressable>
              ))}
            </View>
            <Text style={styles.ratingCaption}>{rating === 0 ? 'TOQUE PARA AVALIAR' : `${rating} DE 5 · AVALIAÇÃO SELECIONADA`}</Text>
          </View>

          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>O QUE ACONTECEU?</Text>
            <Text style={styles.sectionHint}>Selecione todas as opções relevantes</Text>
            <View style={styles.tagGrid}>
              {tags.map((tag) => {
                const selected = selectedTags.includes(tag);
                return <Pressable key={tag} accessibilityRole="checkbox" accessibilityState={{ checked: selected }} onPress={() => toggleTag(tag)} style={[styles.tag, selected && styles.tagSelected]}><Text style={[styles.tagText, selected && styles.tagTextSelected]}>{tag}</Text>{selected && <Check color={palette.cyan} size={13} />}</Pressable>;
              })}
            </View>
          </View>

          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>OBSERVAÇÕES <Text style={styles.optional}>· OPCIONAL</Text></Text>
            <TextInput
              accessibilityLabel="Observações sobre o trajeto"
              value={notes}
              onChangeText={(value) => { setNotes(value); setSubmitted(false); }}
              style={styles.notes}
              placeholder="Descreva algum ponto importante..."
              placeholderTextColor="#71828A"
              multiline
              maxLength={400}
              textAlignVertical="top"
            />
            <Text style={styles.counter}>{notes.length}/400</Text>
          </View>

          <Pressable accessibilityRole="button" disabled={rating === 0} onPress={() => setSubmitted(true)} style={[styles.submitButton, rating === 0 && styles.submitDisabled]}>
            <Text style={styles.submitText}>REGISTRAR AVALIAÇÃO</Text><ChevronRight color="#081213" size={17} />
          </Pressable>
        </>
      )}
      <Text style={styles.disclaimer}>PROTÓTIPO LOCAL · NÃO SUBSTITUI REGISTRO OPERACIONAL.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: palette.bg },
  content: { padding: 20, paddingTop: 18, paddingBottom: 28, gap: 17 },
  header: { gap: 7 },
  kicker: { color: palette.muted, fontFamily: 'SpaceMono', fontSize: 9 },
  kickerAccent: { color: palette.red },
  title: { color: palette.text, fontSize: 25, fontWeight: '700' },
  subtitle: { color: palette.muted, fontSize: 12, lineHeight: 18 },
  tripCard: { flexDirection: 'row', alignItems: 'center', gap: 11, padding: 13, backgroundColor: palette.panel, borderRadius: 5, borderWidth: 1, borderColor: palette.border },
  tripIcon: { width: 34, height: 34, borderRadius: 4, alignItems: 'center', justifyContent: 'center', backgroundColor: '#12302F' },
  tripCopy: { flex: 1, gap: 4 },
  tripTitle: { color: palette.text, fontSize: 12, fontWeight: '600' },
  tripSub: { color: palette.muted, fontFamily: 'SpaceMono', fontSize: 7 },
  tripTime: { color: '#BAC7CB', fontFamily: 'SpaceMono', fontSize: 10 },
  ratingPanel: { alignItems: 'center', backgroundColor: palette.panel, borderRadius: 5, borderWidth: 1, borderColor: palette.border, paddingVertical: 19, paddingHorizontal: 14 },
  question: { color: palette.text, fontSize: 14, fontWeight: '600', textAlign: 'center' },
  hint: { color: palette.muted, fontSize: 10, marginTop: 5 },
  stars: { flexDirection: 'row', gap: 9, marginTop: 17 },
  starButton: { minWidth: 38, minHeight: 38, alignItems: 'center', justifyContent: 'center' },
  ratingCaption: { color: palette.amber, fontFamily: 'SpaceMono', fontSize: 8, marginTop: 10 },
  formSection: { gap: 8 },
  sectionTitle: { color: '#BCC9CD', fontFamily: 'SpaceMono', fontSize: 9, fontWeight: '700' },
  sectionHint: { color: palette.muted, fontSize: 10 },
  optional: { color: palette.muted, fontSize: 8, fontWeight: '400' },
  tagGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 3 },
  tag: { minHeight: 36, flexDirection: 'row', alignItems: 'center', gap: 7, borderWidth: 1, borderColor: palette.border, borderRadius: 4, paddingHorizontal: 11 },
  tagSelected: { borderColor: palette.cyan, backgroundColor: '#102421' },
  tagText: { color: '#AAB8BD', fontSize: 10 },
  tagTextSelected: { color: palette.cyan },
  notes: { minHeight: 88, backgroundColor: palette.panel, borderWidth: 1, borderColor: palette.border, borderRadius: 4, color: palette.text, fontSize: 11, padding: 11 },
  counter: { color: palette.muted, fontFamily: 'SpaceMono', fontSize: 7, textAlign: 'right', marginTop: -5 },
  submitButton: { minHeight: 49, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8, backgroundColor: palette.cyan, borderRadius: 4 },
  submitDisabled: { backgroundColor: '#3A4C50' },
  submitText: { color: '#081213', fontFamily: 'SpaceMono', fontSize: 9, fontWeight: '700' },
  successPanel: { alignItems: 'center', justifyContent: 'center', backgroundColor: palette.panel, borderWidth: 1, borderColor: '#23443F', borderRadius: 5, padding: 24, gap: 11, minHeight: 230 },
  successIcon: { width: 42, height: 42, borderRadius: 21, backgroundColor: palette.cyan, alignItems: 'center', justifyContent: 'center' },
  successTitle: { color: palette.text, fontSize: 17, fontWeight: '700' },
  successText: { color: palette.muted, fontSize: 11, textAlign: 'center', lineHeight: 17 },
  editButton: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  editButtonText: { color: palette.cyan, fontFamily: 'SpaceMono', fontSize: 8 },
  disclaimer: { color: '#71828A', fontFamily: 'SpaceMono', fontSize: 7, lineHeight: 12, textAlign: 'center' },
});