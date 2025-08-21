import { View } from 'react-native';
import { Card, Text } from 'react-native-paper';
import Theme from '../../theme';


import { faHandHoldingDollar, faMoneyBill, faScaleBalanced } from '@fortawesome/free-solid-svg-icons';

const iconSize = 30;
const Resumo = (props) => (
  <>
  
  <Card style={{ marginTop: 10, marginBottom: 5, marginLeft: 10, marginRight: 10, backgroundColor: '#fff'}}>
    <View style={[Theme.CardGeral]}>
      <View style={[Theme.TitleCard, Theme.TitleCardLeft]}>
        <Text style={[Theme.TitleCardText, {color: Theme.Colors.FontColor1, fontWeight: 'bold'}]}>
          Resumo Mensal
        </Text>
      </View>
    </View>
    <Card.Content>
      <View style={[Theme.CardGeral, {marginTop: 15}]}>
        <View style={[Theme.ElementoCardGeral, {flex: 15}]}>
          <View>
            <props.FontAwesomeIcon size={iconSize} icon={ faHandHoldingDollar } style={{color: Theme.Colors.Green1}}/>
          </View>
        </View>
        <View style={[Theme.ElementoCardGeral, {flex: 40}]}>
          <Text style={[Theme.CardFontPrimary, {color: Theme.Colors.FontColor1}]}>Receitas:</Text>
          <Text style={[{color: Theme.Colors.FontColor1}]}>Previsto:</Text>
        </View>
        <View style={[Theme.ElementoCardGeral, {flex: 30}]}>
          <Text style={[Theme.CardFontPrimary, {color: Theme.Colors.FontColor1}]}>R$ {props.totalEffectedReceipt}</Text>
          <Text style={[{color: Theme.Colors.FontColor1}]}>R$ {props.totalPredictedReceipt}</Text>
        </View>
      </View>

      <View style={[Theme.CardGeral, {marginTop: 15}]}>
        <View style={[Theme.ElementoCardGeral, {flex: 15}]}>
        <props.FontAwesomeIcon size={iconSize} icon={ faMoneyBill } style={{color: Theme.Colors.Red1}}/>
        </View>
        <View style={[Theme.ElementoCardGeral, {flex: 40}]}>
          <Text style={[Theme.CardFontPrimary, {color: Theme.Colors.FontColor1}]}>Despesas:</Text>
          <Text style={[{color: Theme.Colors.FontColor1}]}>Previsto:</Text>
        </View>
        <View style={[Theme.ElementoCardGeral, {flex: 30}]}>
        <Text style={[Theme.CardFontPrimary, {color: Theme.Colors.FontColor1}]}>R$ {props.totalEffectedExpense}</Text>
          <Text style={[{color: Theme.Colors.FontColor1}]}>R$ {props.totalPredictedExpense}</Text>
        </View>
      </View>
      
      <View style={[Theme.CardGeral, {marginTop: 15}]}>
        <View style={[Theme.ElementoCardGeral, {flex: 15}]}>
          <props.FontAwesomeIcon size={iconSize} icon={ faScaleBalanced } style={{color: Theme.Colors.Yellow1}}/>
        </View>
        <View style={[Theme.ElementoCardGeral, {flex: 40}]}>
          <Text style={[Theme.CardFontPrimary, {color: Theme.Colors.FontColor1}]}>Balanço Atual:</Text>
          <Text style={[{color: Theme.Colors.FontColor1}]}>Previsto:</Text>
        </View>
        <View style={[Theme.ElementoCardGeral, {flex: 30}]}>
          <Text style={[Theme.CardFontPrimary, {color: Theme.Colors.FontColor1}]}>R$ {props.balanceEffected}</Text>
          <Text style={[{color: Theme.Colors.FontColor1}]}>R$ {props.balancePredicted}</Text>
        </View>
      </View>
    </Card.Content>
  </Card>
  </>
);

export default Resumo;