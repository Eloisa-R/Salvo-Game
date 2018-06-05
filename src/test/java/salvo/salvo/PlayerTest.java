package salvo.salvo;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class PlayerTest {

    @Test
    void getFirstName() {
        Player testPlayer = new Player("Pepa","Test","pepatest@gmail.com", "1234");
        assertEquals("Pepa", testPlayer.getFirstName());
    }

    @Test
    void setFirstName() {
        Player testPlayer = new Player("Pepe","Test","pepetest@gmail.com", "admin");
        testPlayer.setFirstName("Flor");
        assertEquals("Flor", testPlayer.getFirstName());
    }

    @Test
    void getLastName() {
    }

    @Test
    void setLastName() {
    }

    @Test
    void getUserName() {
    }

    @Test
    void setUserName() {
    }

    @Test
    void getId() {
    }

    @Test
    void getPassword() {
    }

    @Test
    void setPassword() {
    }

    @Test
    void getGames() {
    }

    @Test
    void getGameplayers() {
    }

    @Test
    void addGame() {
    }

    @Test
    void getScores() {
    }


}