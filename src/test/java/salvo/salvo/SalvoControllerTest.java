package salvo.salvo;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.junit.Assert.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringJUnit4ClassRunner.class)
public class SalvoControllerTest {

    private MockMvc mockMvc;

    @InjectMocks
    private SalvoController salvoController;

    @Before
    public void setUp() throws  Exception{
        MockitoAnnotations.initMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(salvoController).build();
    }



    @Test
    public void createNewPlayerTest() throws  Exception{
    System.out.println(mockMvc);
        String inputUser = "paco@test.com";
        String inputFN = "Paco";
        String inputLN = "Test";
        String inputPwd = "54231";
        String body ="username=" + inputUser + "&firstname=" + inputFN + "&lastname=" + inputLN +"&password=" + inputPwd;
        mockMvc.perform(
                post("/api/players")
                        .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                        .content(body))
                .andExpect(status().isCreated())
                .andExpect(content().string("Player created successfully"));


    }

}