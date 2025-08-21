const Colors = {
    Green1: '#2E8B57',
    Red1: '#B22222',
    Yellow1: '#FFD700',
    FontColor1: '#777777',
    FontColorSec: 'white',
    White: 'white',
    Background: '#F8FFFA',
    Gray2: '#d4d2d2'
}

const Theme = {
    BottomBar: {
        contemFab: {
            margin: 12,
            textAlign: 'center',
            flexDirection: 'column',
            alignItems: 'center'
        },
        textFab: {
            fontSize: 12,
            textAlign: 'center',
            marginTop: 2,
            marginBottom: 1,
            fontFamily: 'Roboto',
            fontWeight: 'bold'
        },
        iconFab: {
            textAlign: 'center', 
            fontSize: 20,
            color: Colors.Green1
        }
    },
    MainView: {
        flex: 1,
        paddingBottom: 100
    },
    Colors: {
        Green1: '#2E8B57',
        Red1: '#B22222',
        Yellow1: '#FFD700',
        FontColor1: '#777777',
        FontColorSec: 'white',
        White: 'white',
        Background: '#F8FFFA',
        Gray2: '#d4d2d2'

    },
    CardGeral: {
        flexDirection: 'row', // Define a direção do layout para horizontal
        justifyContent: 'space-between', // Alinha os elementos com espaço entre eles
        alignItems: 'center', // Alinha os elementos verticalmente
    },
    ElementoCardGeral: {
        //backgroundColor: 'lightblue',
        padding: 0,
        borderRadius: 5, 
    },
    CardFontPrimary: {
        fontSize: 15,
        fontWeight: 'bold'
    },
    TitleCard: {
        paddingTop: 10,
    },
    TitleCardText: {
        fontSize: 18,
    },
    TitleCardLeft: {
        paddingLeft: 20,
    },
    TitleCardRight: {
        paddingRight: 20,
    },
    BtnHover: {
        bottom: {
            backgroundColor: '#f5f5f5',
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            flex: 1
          },
          fab: {
            position: 'absolute',
            right: 16,
          },
          btnHovered: {
            backgroundColor: 'lightgray',
            width: 100
          }
    },
    ModalOpacity: {
        flex: 1, 
        backgroundColor: 'black', 
        zIndex: 1, 
        width: '100%', 
        position: 'absolute', 
        height: '100%', 
        opacity: 0.3
    },
    ModalBody: {
        width: '100%',
        minHeight: '75%',
        maxHeight: '75%',
        backgroundColor: 'white',
        zIndex: 2,
        position: 'absolute',
        bottom: 0,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20
    },
    ModalTitle: {
        padding: 10,
        textAlign: 'center',
        fontSize: 20,
    },
    ModalInput: { 
        width: '100%', 
        marginTop: 10,
        color: Colors.FontColor1
    },
    ModalButtonPrimary: { 
        backgroundColor: Colors.Green1
    },
    ModalButtonSecondary: {
        borderColor: 'gray', 
        color: Colors.FontColor1,
    },
    ModalInputText: {
        backgroundColor: 'white',
        color: Colors.FontColor1
    },
    ModalDivider: {
        marginBottom: 0
    },
    TextInput: {
        height: 45, 
        width: '90%', 
        borderColor: 'gray', 
        padding: 15,
        borderRadius: 20,
        backgroundColor: Colors.White,
        shadowColor: '#000',
        elevation: 2,
        margin: 10,
        marginLeft: 18,
        color: Colors.FontColor1
    },
    LabelInput: {
        
        position: 'absolute', 
        fontSize: 12, 
        textAlign: 'center', 
        marginLeft:40, 
        marginTop: 2, 
        zIndex: 1, 
        backgroundColor: Colors.White,
        color: Colors.FontColor1
    
    },
    Chip: {
        height: 45, 
        borderColor: 'gray', 
        padding: 15,
        borderRadius: 20,
        backgroundColor: Colors.White,
        shadowColor: '#000',
        elevation: 2,
        color: Colors.FontColor1,
        width: '30%', color: Colors.FontColor1, flexDirection: 'row', justifyContent: 'center',
    },
    CadastroLink: {color: Colors.FontColor1, fontSize: 15, marginTop: 15}

}

export default Theme;