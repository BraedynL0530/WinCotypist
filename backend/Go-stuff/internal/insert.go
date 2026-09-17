package internal

// inserts text in detected box

import (
	robot "github.com/go-vgo/robotgo"
)

type InsertionData struct {
	text     string
	length   int  // same as below just extra data to help optmize llm!
	approved bool // tab pressed or not, possibly useful data/telemetry whatever its called
	relevant bool // thumbs up in gui = yes thumbs down = no, for gui/llm later
}

func findBox() (x, y int) { // needs to find where cursor is and return int/string of what box
	return 1, 0 //temp
}
func Insert(text string) error {
	err := robot.WriteAll(text)
	if err != nil {
		return err
	}
	err = robot.CmdV()
	if err != nil {
		return err
	}

	return nil
}
