#!/usr/bin/env python3

import os
import sys
if __name__ == "__main__":
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "db.settings")
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError("Where's Django? Is it on the PYTHONPATH env? Did you forget to activate a virtual environment?") from exc
    execute_from_command_line(sys.argv)
