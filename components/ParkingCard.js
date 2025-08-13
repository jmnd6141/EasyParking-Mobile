
import { View, Text, StyleSheet } from 'react-native';
import Button from './Button';
import SocialButton from './SocialButton';
import ProfileLocationCard from './ProfileLocationCard';

export default function ParkingCard(props) {
  return (
    <View style={styles.container}>
      <ProfileLocationCard style={styles.topSection} title={props.title} information={props.info} />
      <View style={styles.detailsContainer}>
        <View style={styles.detail}>
          <Text style={styles.detailLabel}>Distance</Text>
          <Text style={styles.detailValue}>{props.distance}</Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.detailLabel}>Trajet</Text>
          <Text style={styles.detailValue}>{props.travelTime}</Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.detailLabel}>Places</Text>
          <Text style={styles.detailValue}>{props.freePlaces}</Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.detailLabel}>Ouverture</Text>
          <Text style={styles.detailValue}>{props.opening}</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          style={styles.button}
          title={props.isReserved ? 'Partir' : 'Réserver'}
          color={props.isReserved ? 'red' : '#4FA3D1'}
          onPress={props.onReserve}
        />
        <SocialButton style={styles.button} title="Itinéraire" icon="arrow-right" onPress={props.onItinerary}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#252A32',
    borderRadius: 43,
    paddingTop: 0,
    padding: 0,
    paddingBottom: 15,
    marginVertical: 10,
    width: '90%',
    alignSelf: 'center',
    elevation: 3,
  },
  topSection: {
    backgroundColor: '#333842',
    width: '100%',
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 8,
  },
  detail: {
    alignItems: 'center',
    flex: 1,
  },
  detailLabel: {
    color: '#777',
    fontSize: 12,
    marginBottom: 5,
  },
  detailValue: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
  },
  button: {
    marginHorizontal: 6,
    width: '75%',
  },
});
