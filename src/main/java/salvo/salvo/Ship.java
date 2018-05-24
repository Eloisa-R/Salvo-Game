package salvo.salvo;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.List;

import static java.util.stream.Collectors.toList;

@Entity
public class Ship {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private long id;

    public enum ShipType { AIRCRAFT_CARRIER, BATTLESHIP, SUBMARINE, DESTROYER, PATROL_BOAT};

    private ShipType type;

    @ElementCollection
    @Column(name="locations")
    private List<String> locations;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="ship_gp_id")
    private GamePlayer ship_gp;

    public Ship() {}

    public Ship(ShipType inputType, List<String> inputLocations) {
        this.type = inputType;
        this.locations = inputLocations;
    }


    public void setGamePlayer(GamePlayer gp) {
        this.ship_gp = gp;
    }

    public ShipType getType() {
        return type;
    }

    public List<String> getLocations() {
        return locations;
    }

    @JsonIgnore
    public GamePlayer getGp() {
        return ship_gp;
    }
}
