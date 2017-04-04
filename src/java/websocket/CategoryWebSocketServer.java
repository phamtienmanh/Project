/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package websocket;

import entities.Category;
import java.util.Set;
import javax.jms.Session;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.server.ServerEndpoint;
import org.jboss.weld.util.collections.ArraySet;

/**
 *
 * @author KID
 */
@ServerEndpoint("/socket.io-client")
public class CategoryWebSocketServer {
    private static final Set<Session> SESSIONS =  new ArraySet<Session>();

    @OnOpen
    public void onOpen(Session session) {
        SESSIONS.add(session);
    }

    public static void sendCatAll(Category cat) {
        synchronized (SESSIONS) {
            for (Session session : SESSIONS) {
//                session.se;
            }
        }
    }

    @OnClose
    public void close(Session session) {
        SESSIONS.remove(session);
    }

    @OnError
    public void onError(Throwable error) {
    }

    @OnMessage
    public void handleMessage(String message, Session session) {
        String a = "aaa";
    }
}
