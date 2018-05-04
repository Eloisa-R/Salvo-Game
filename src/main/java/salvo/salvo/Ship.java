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

    public enum ShipType { CARRIER, BATTLESHIP, SUBMARINE, DESTROYER, PATROL_BOAT};

    private ShipType type;

    @ElementCollection
    @Column(name="locations")
    private List<String> locations;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="gameplayer")
    private GamePlayer gp;

    public Ship() {}

    public Ship(ShipType inputType, List<String> inputLocations, GamePlayer inputGp) {
        this.type = inputType;
        this.locations = inputLocations;
        this.gp = inputGp;
    }


    public void setGamePlayer(GamePlayer gp) {
        this.gp = gp;
    }

    public ShipType getType() {
        return type;
    }

    public List<String> getLocations() {
        return locations;
    }

    @JsonIgnore
    public GamePlayer getGp() {
        return gp;
    }
}
