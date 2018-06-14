package salvo.salvo;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Salvo {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="gameplayer")
    private GamePlayer relatedGamePlayer;

    private Integer turnNumber;

    @ElementCollection
    @Column(name="salvoLocations")
    private List<String> salvoLocations;

    public Salvo(){}

    public Salvo(GamePlayer inputGamePlayer, int inputTurn, List<String> inputLocations) {
        this.relatedGamePlayer = inputGamePlayer;
        this.turnNumber = inputTurn;
        this.salvoLocations = inputLocations;
    }

    public GamePlayer getRelatedGamePlayer() {
        return relatedGamePlayer;
    }

    public void setRelatedGamePlayer(GamePlayer relatedGamePlayer) {
        this.relatedGamePlayer = relatedGamePlayer;
    }

    public int getTurnNumber() {
        return turnNumber;
    }

    public void setTurnNumber(int turnNumber) {
        this.turnNumber = turnNumber;
    }

    public List<String> getSalvoLocations() {
        return salvoLocations;
    }

    public void setSalvoLocations(List<String> salvoLocations) {
        this.salvoLocations = salvoLocations;
    }
}
