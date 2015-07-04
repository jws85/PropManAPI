install: install-systemd

install-systemd: install-systemd-init

install-systemd-init:
	cp init/propman.service /etc/systemd/system

uninstall: uninstall-systemd

uninstall-systemd: uninstall-systemd-init

uninstall-systemd-init:
	rm -f /etc/systemd/system/propman.service
