import ctypes
import time
from comtypes.client import CreateObject
from comtypes.gen import UIAutomationClient
#suppose to find the typing cursor globablyy!


#makes windows see dpi
try:
    ctypes.windll.shcore.SetProcessDpiAwareness(2)
except Exception:
    ctypes.windll.user32.SetProcessDPIAware()

def get_universal_caret_coordinates():
    try:
        #create the UI Automation connection
        uia = CreateObject(UIAutomationClient.CUIAutomation)
        focused_element = uia.GetFocusedElement()

        if not focused_element:
            return None

        #request the Text Pattern (this exposes text boxes to the OS)
        pattern_id = UIAutomationClient.UIA_TextPatternId
        text_pattern = focused_element.GetCurrentPattern(pattern_id)

        if text_pattern:
            text_pattern = text_pattern.QueryInterface(UIAutomationClient.IUIAutomationTextPattern)
            selection_ranges = text_pattern.GetSelection()

            if selection_ranges and selection_ranges.Length > 0:
                text_range = selection_ranges.GetElement(0)

               #finds coords of typing cursor
                rects = text_range.GetBoundingRectangles()
                if rects and len(rects) >= 4:
                    left = rects[0]
                    top = rects[1]
                    width = rects[2]

                    return int(left + width), int(top)
    except Exception:
        pass
    return None

try:
    while True:
        coords = get_universal_caret_coordinates()
        if coords:
            print(f"X: {coords[0]}, Y: {coords[1]}")
        time.sleep(0.05) # 50ms interval prevents lag while typing

