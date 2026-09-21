package main

import (
	"fmt"
	"os"
	"sync/atomic"

	"github.com/BraedynL0530/WinCotypist/internal"
	hook "github.com/robotn/gohook"
)

func main() {
	buffer := &internal.RollingBuffer{} // add non zero values in prod

	var isTabPressed atomic.Bool
	var pendingCompletion string

	server, err := internal.StartServer("8080", func(incomingData string) {
		fmt.Println("Go from python:", incomingData)
		pendingCompletion = incomingData

		if pendingCompletion != "" && isTabPressed.Load() {
			err := internal.Insert(pendingCompletion)
			if err != nil {
				fmt.Println(err)
			}
			pendingCompletion = ""

		}

	})
	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}

	defer server.Close()

	go func() {
		evChan := hook.Start()
		fmt.Println("Hook started")
		captureChan := make(chan hook.Event)
		go internal.StartCapture(buffer, captureChan)

		for ev := range evChan {

			captureChan <- ev

			if ev.Kind == 3 {
				if ev.Rawcode == 9 { // tab
					if ev.Kind == 3 || ev.Kind == 4 {
						isTabPressed.Store(true)
					}
					if ev.Kind == 5 {
						isTabPressed.Store(false)
					}
				} else {

					pendingCompletion = ""
					fmt.Printf(`{"type":"hide"}` + "\n")
				}
			}

			if ev.Rawcode == 32 && ev.Kind == 3 {
				err := server.Send(buffer.SnapShot())
				if err != nil {
					fmt.Println(err)
				}
				fmt.Println("SnapShot:", buffer.SnapShot())
			}

		}

		hook.Register(hook.MouseDown, nil, func(ev hook.Event) {
			buffer.Reset(false)
		})
	}()
	select {}
}
