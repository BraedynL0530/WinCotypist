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

	server, err := internal.StartServer("8080", func(incomingData string) {
		fmt.Println("Go from python:", incomingData)

		if incomingData != "" && isTabPressed.Load() {
			err := internal.Insert(incomingData)
			if err != nil {
				fmt.Println(err)
			}
		}

	})
	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}

	defer server.Close()

	go internal.StartCapture(buffer)

	go func() {
		evChan := hook.Start()

		for ev := range evChan {
			if ev.Rawcode == 15 { // tab
				if ev.Kind == 1 {
					isTabPressed.Store(true)
				}
				if ev.Kind == 2 {
					isTabPressed.Store(false)
				}
			}

			if ev.Rawcode == 57 && ev.Kind == 1 {
				err := server.Send(buffer.SnapShot())
				if err != nil {
					fmt.Println(err)
				}
				fmt.Println("SnapShot:", buffer.SnapShot()) // no backend currently :3
			}

		}

		hook.Register(hook.MouseDown, nil, func(ev hook.Event) {
			buffer.Reset(false)
		})
	}()
	select {}
}
