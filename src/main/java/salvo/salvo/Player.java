package salvo.salvo;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

import static java.util.stream.Collectors.toList;

@Entity
public class Player {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private long id;
    private String firstName;
    private String lastName;
    private String userName;

    @OneToMany(mappedBy = "gamePlayer", fetch=FetchType.EAGER)
    Set<GamePlayer> gameplays;

    public Player() { }

    public Player(String first, String last, String email) {
        this.firstName = first;
        this.lastName = last;
        this.userName = email;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public void addGame(GamePlayer gameplay){
        gameplay.setGamePlayer(this);
        gameplays.add(gameplay);
    }

    @JsonIgnore
    public List<Game> getGames() {
        return gameplays.stream().map(gp -> gp.getGameEntry()).collect(toList());
    }

    public String toString() {
        return firstName + " " + lastName + " " + userName;
    }
}