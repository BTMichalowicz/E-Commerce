#!/usr/bin/env python3

import os
import sys

if __name__ == "__main__":
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "db.settings")
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError("Django not found. is it installed and available on a PYTHONPATH environment var? Did you forget to make a virtual environment?") from exc
    execute_from_command_line(sys.argv)


