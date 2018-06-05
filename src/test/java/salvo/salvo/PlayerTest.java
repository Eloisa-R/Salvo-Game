package salvo.salvo;

import org.junit.jupiter.api.Test;

import java.util.Date;

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
        Player testPlayer = new Player("Pepa","Test","pepatest@gmail.com", "1234");
        assertEquals("Test", testPlayer.getLastName());
    }

    @Test
    void setLastName() {
        Player testPlayer = new Player("Pepa","Testing","pepatest@gmail.com", "1234");
        testPlayer.setLastName("Test");
        assertEquals("Test", testPlayer.getLastName());
    }

    @Test
    void getUserName() {
        Player testPlayer = new Player("Pepa","Testing","pepatest@gmail.com", "1234");
        assertEquals("pepatest@gmail.com", testPlayer.getUserName());
    }

    @Test
    void setUserName() {
        Player testPlayer = new Player("Pepa","Testing","...", "1234");
        testPlayer.setUserName("pepatest@gmail.com");
        assertEquals("pepatest@gmail.com", testPlayer.getUserName());
    }

    @Test
    void getId() {

    }

    @Test
    void getPassword() {
        Player testPlayer = new Player("Pepa","Testing","pepatest@gmail.com", "1234");
        assertEquals("1234", testPlayer.getPassword());
    }

    @Test
    void setPassword() {
        Player testPlayer = new Player("Pepa","Testing","pepatest@gmail.com", "1234");
        testPlayer.setPassword("admin");
        assertEquals("admin", testPlayer.getPassword());
    }

    @Test
    void getGames() {
        Player testPlayer = new Player("Pepa","Testing","pepatest@gmail.com", "1234");
        assertTrue(testPlayer.getGames().isEmpty());
        Game testGame = new Game();
        GamePlayer testGamePlayer = new GamePlayer(testGame, testPlayer);
        testPlayer.addGame(testGamePlayer);
        assertTrue(testPlayer.getGames().contains(testGame));
    }

    @Test
    void getGameplayers() {
        Player testPlayer = new Player("Pepa","Testing","pepatest@gmail.com", "1234");
        assertTrue(testPlayer.getGameplayers().isEmpty());
        Game testGame = new Game();
        GamePlayer testGamePlayer = new GamePlayer(testGame, testPlayer);
        testPlayer.addGame(testGamePlayer);
        assertTrue(testPlayer.getGameplayers().contains(testGamePlayer));
    }

    @Test
    void addGame() {
        Player testPlayer = new Player("Pepa","Testing","pepatest@gmail.com", "1234");
        assertTrue(testPlayer.getGameplayers().isEmpty());
        Game testGame = new Game();
        GamePlayer testGamePlayer = new GamePlayer(testGame, testPlayer);
        testPlayer.addGame(testGamePlayer);
        assertTrue(testPlayer.getGameplayers().contains(testGamePlayer));
        Game testSecondGame = new Game();
        GamePlayer testSecondGamePlayer = new GamePlayer(testSecondGame, testPlayer);
        testPlayer.addGame(testSecondGamePlayer);
        assertTrue(testPlayer.getGameplayers().contains(testGamePlayer));
        assertTrue(testPlayer.getGameplayers().contains(testSecondGamePlayer));
    }

    //TODO: add test to see if element in Set of GamePlayers is not repeated

    @Test
    void getScores() {
        Player testPlayer = new Player("Pepa","Testing","pepatest@gmail.com", "1234");
        Game testGame = new Game();
        Game secondTestGame = new Game();
        Score testScore = new Score(testGame,testPlayer,1,new Date().from(testGame.getCreationDate().toInstant().plusSeconds(1800)));
        Score secondTestScore = new Score(secondTestGame,testPlayer,1,new Date().from(secondTestGame.getCreationDate().toInstant().plusSeconds(1800)));
        testPlayer.addScore(testScore);
        testPlayer.addScore(secondTestScore);
        assertTrue(testPlayer.getScores().contains(testScore));
        assertTrue(testPlayer.getScores().contains(secondTestScore));
    }


}