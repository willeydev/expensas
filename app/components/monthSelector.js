import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Theme from '../theme';

const BOTTOM_APPBAR_HEIGHT = 80;
const MEDIUM_FAB_HEIGHT = 56;

const MonthSelector = (props) => {
    const FontAwesomeIcon = props.FontAwesomeIcon;
    const [isHovered, setIsHovered] = useState(false);

    const currentDate = new Date();
    const [month, setMonth] = useState(currentDate.getMonth());
    const [year, setYear] = useState(currentDate.getFullYear())

    const months = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
      ];

    let paramMonth = 0;
    let paramYear = 0;

    const changeDate = (side) => {

        if(side == 'left') {
            if(month == 0) {
                setYear(year-1);
                props.setYear(String(year-1));
            }
            setMonth(month > 0 ? month -1 : 11);
            paramMonth = month > 0 ? String(month).padStart(2, '0') : '12';
        } else if(side == 'right') {
            if(month == 11) {
                setYear(year+1);
                props.setYear(String(year+1));
            }
            setMonth(month == 11 ? 0 : month + 1);
            paramMonth = month + 2 == 13 ? '01' : String(month + 2).padStart(2, '0');
        }
        
        props.setMonth(paramMonth);
    }

    return (
        <>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                
                <TouchableOpacity
                    style={[styles.button, isHovered && styles.buttonHovered]}
                    onPressIn={() => setIsHovered(true)}
                    onPressOut={() => setIsHovered(false)}
                    onPress={() => changeDate('left')}
                >
                    <FontAwesomeIcon 
                        icon={faArrowLeft} size={25} 
                        style={{color: Theme.Colors.FontColor1, marginTop: 10}}    
                    />
                </TouchableOpacity>
                <Text style={{marginTop: 6, marginLeft: 10, marginRight: 10, fontSize: 20, color: Theme.Colors.FontColor1}}>
                    {months[month]}/{year}
                </Text>
                <TouchableOpacity
                    style={[styles.button, isHovered && styles.buttonHovered]}
                    onPressIn={() => setIsHovered(true)}
                    onPressOut={() => setIsHovered(false)}
                    onPress={() => changeDate('right')}
                >
                    <FontAwesomeIcon 
                        icon={faArrowRight} size={25} 
                        style={{color: Theme.Colors.FontColor1, marginTop: 10}}    
                    />
                </TouchableOpacity>
            
            </View>
        </>
    );
};

const styles = StyleSheet.create(Theme.BtnHover);

export default MonthSelector;