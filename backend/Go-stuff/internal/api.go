package internal

import (
	"bufio"
	"fmt"
	"net"
	"sync"
)

//WAS gonna use IPC but SHIT support in go-winio so tcp it is!
//WHERE DID MY TIME Go!!!

type DataHandler func(content string)

type TCPServer struct {
	listener net.Listener
	conn     net.Conn
	mu       sync.Mutex
}

func StartServer(port string, handler DataHandler) (*TCPServer, error) {
	listener, err := net.Listen("tcp", ":"+port)
	if err != nil {
		return nil, err
	}
	server := &TCPServer{listener: listener}

	go func() {
		defer listener.Close()
		for {
			conn, err := listener.Accept()
			if err != nil {
				continue
			}
			server.mu.Lock()
			server.conn = conn
			server.mu.Unlock()

			go server.handleConnection(conn, handler)
		}
	}()

	fmt.Println("Server started")

	return server, nil
}

func (s *TCPServer) handleConnection(conn net.Conn, handler DataHandler) {
	defer conn.Close()
	scanner := bufio.NewScanner(conn)
	for scanner.Scan() {
		handler(scanner.Text())
	}
}
func (s *TCPServer) Send(text string) error {
	s.mu.Lock()
	defer s.mu.Unlock()
	if s.conn == nil {
		return net.ErrClosed
	}
	_, err := s.conn.Write([]byte(text + "\n")) // so it knows its done
	fmt.Println("Sent:", text)
	return err
}

func (s *TCPServer) Close() {
	s.mu.Lock()
	if s.conn != nil {
		s.conn.Close()
	}

	fmt.Println("Server closing...")
	s.mu.Unlock()
	s.listener.Close()
}

