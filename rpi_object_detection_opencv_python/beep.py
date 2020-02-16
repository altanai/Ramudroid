import os
beep = lambda x: os.system("echo -n '\a';sleep 0.2;" * x)
beep(4)