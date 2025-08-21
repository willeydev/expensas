import { useState } from "react";
import { FlatList, Modal, Text, TextInput, TouchableOpacity, View } from "react-native";
import Theme from "../../theme";

const Dash = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState(null);

  const openModal = (type) => {
    setModalType(type);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setModalType(null);
  };

  return (
    <View style={Theme.MainView}>
      {/* -------- Card 1: Receitas e Despesas -------- */}
      <View style={[Theme.ElementoCardGeral, { margin: 10, padding: 15, backgroundColor: Theme.Colors.White, elevation: 3 }]}>
        <Text style={Theme.CardFontPrimary}>Receitas e Despesas</Text>
        <View style={{ marginTop: 10 }}>
          <Text>Efetivado: Receita R$ 5000 | Despesa R$ 3500</Text>
          <Text>Previsto: Receita R$ 6000 | Despesa R$ 4000</Text>
          <Text style={{ marginTop: 5, fontWeight: "bold" }}>Balanço: R$ 1500 (Efetivado)</Text>
          <Text style={{ fontWeight: "bold" }}>Balanço Previsto: R$ 2000</Text>
        </View>
      </View>

      {/* -------- Card 2: Cartões -------- */}
      <View style={[Theme.ElementoCardGeral, { margin: 10, padding: 15, backgroundColor: Theme.Colors.White, elevation: 3 }]}>
        <Text style={Theme.CardFontPrimary}>Cartões</Text>
        <FlatList
          data={[
            { id: 1, nome: "Nubank", limite: 5000, usado: 1500 },
            { id: 2, nome: "Itaú", limite: 3000, usado: 500 },
          ]}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            const disponivel = item.limite - item.usado;
            const percent = (disponivel / item.limite) * 100;
            return (
              <View style={{ marginVertical: 10 }}>
                <Text>{item.nome} - Disponível: R$ {disponivel}</Text>
                <View style={{ height: 8, backgroundColor: Theme.Colors.Gray2, borderRadius: 4, marginTop: 5 }}>
                  <View style={{ width: `${percent}%`, backgroundColor: Theme.Colors.Green1, height: 8, borderRadius: 4 }} />
                </View>
              </View>
            );
          }}
        />
      </View>

      {/* -------- Card 3: Contas -------- */}
      <View style={[Theme.ElementoCardGeral, { margin: 10, padding: 15, backgroundColor: Theme.Colors.White, elevation: 3 }]}>
        <Text style={Theme.CardFontPrimary}>Contas</Text>
        {["Conta Corrente", "Poupança", "Investimentos"].map((conta, index) => (
          <Text key={index} style={{ marginTop: 5 }}>{conta}</Text>
        ))}
      </View>

      {/* -------- Menu Inferior -------- */}
      <View style={Theme.BtnHover.bottom}>
        <View style={{ flexDirection: "row", justifyContent: "space-around", padding: 10 }}>
          <TouchableOpacity style={{ alignItems: "center" }} onPress={() => openModal("despesa")}>
            <Text style={{ color: Theme.Colors.Green1 }}>+ Despesa</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ alignItems: "center" }} onPress={() => openModal("despesaCartao")}>
            <Text style={{ color: Theme.Colors.Green1 }}>+ Despesa Cartão</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ alignItems: "center" }} onPress={() => openModal("receita")}>
            <Text style={{ color: Theme.Colors.Green1 }}>+ Receita</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ alignItems: "center" }}>
            <Text style={{ color: Theme.Colors.Green1 }}>Listagem</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* -------- Modal -------- */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={Theme.ModalOpacity} />
        <View style={Theme.ModalBody}>
          <Text style={Theme.ModalTitle}>
            {modalType === "despesa" && "Adicionar Despesa"}
            {modalType === "despesaCartao" && "Adicionar Despesa de Cartão"}
            {modalType === "receita" && "Adicionar Receita"}
          </Text>

          {/* Exemplo de formulário simples */}
          <TextInput
            placeholder="Descrição"
            style={Theme.TextInput}
            placeholderTextColor={Theme.Colors.FontColor1}
          />
          <TextInput
            placeholder="Valor"
            style={Theme.TextInput}
            placeholderTextColor={Theme.Colors.FontColor1}
            keyboardType="numeric"
          />

          <TouchableOpacity style={[Theme.ModalButtonPrimary, { marginTop: 15, padding: 12, borderRadius: 10 }]} onPress={closeModal}>
            <Text style={{ color: "white", textAlign: "center" }}>Salvar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ marginTop: 10 }} onPress={closeModal}>
            <Text style={{ textAlign: "center", color: Theme.Colors.Red1 }}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default Dash;
